## GitHub integration (Actions sync + GitHub App webhooks)

This guide explains how to set up GitHub → Symbols syncing using:

- **GitHub Actions** (push-triggered) to run `smbls github sync`
- **Symbols GitHub App** (optional but recommended) for webhooks, audit, and metadata (`push`, `pull_request`, etc.)

This matches the CLI commands implemented under `packages/cli/bin/github/*`.

---

## 0) Prereqs

- A **Symbols project** already exists (or create/link one with `smbls project create` / `smbls project link .`).
- A **GitHub repository** exists (or will be created), and you can push to it.
- Your Symbols server is configured for GitHub App webhooks:
  - Server env: `SYMBOLS_GITHUB_APP_WEBHOOK_SECRET` (or `GITHUB_APP_WEBHOOK_SECRET`)
  - GitHub App’s webhook secret must match it.

---

## 1) Create the GitHub repo and push code

From your DOMQL app folder:

```bash
git init
git add .
git commit -m "init"
git branch -M main

# create remote repo on GitHub (via UI or gh CLI), then:
git remote add origin git@github.com:OWNER/REPO.git
git push -u origin main
```

---

## 2) Link the local folder to a Symbols project (if not already)

```bash
smbls login
smbls project link . --id <projectId>
# or
smbls project link . --key your-project.symbo.ls
```

This ensures `.symbols/config.json` has your `projectId` / `apiBaseUrl`.

### If you have multiple servers/environments

The CLI uses the currently selected server (API base URL). You can list/switch it via:

```bash
smbls servers
smbls servers --select
```

You can also override per command via env:

```bash
export SYMBOLS_API_BASE_URL="https://api.dev.symbols.app"
```

---

## 3) Create Integration + API key + GitHub connector (one command)

Run:

```bash
smbls github connect --repository OWNER/REPO
```

What this does:

- Creates a Symbols **Integration** (scoped to the project)
- Creates an **Integration API key** for CI (scope: `connectors:github:sync`)
- Creates a **GitHub connector** for `OWNER/REPO`
- Writes **`.symbols/github.json`** with connector info
- Prints a one-time secret value for the next step (**`SYMBOLS_API_KEY`**)

---

## 4) Add the CI secret in GitHub

In the GitHub repo settings:

- Go to **Settings → Secrets and variables → Actions → New repository secret**
- Name: **`SYMBOLS_API_KEY`**
- Value: the API key printed by `smbls github connect`

(You can also store it as an org secret if you prefer.)

---

## 5) Generate the GitHub Actions workflow file

Run in the repo:

```bash
smbls github init-actions
```

This creates:

- `.github/workflows/smbls-sync.yml`

Commit + push it:

```bash
git add .github/workflows/smbls-sync.yml .symbols/github.json
git commit -m "ci: add smbls sync workflow"
git push
```

On the next push, GitHub Actions will:

- `actions/checkout`
- install `smbls`
- run `smbls github sync ...`
- POST the payload to:
  - `POST /core/connectors/github/:connectorId/sync`
  - using `Authorization: ApiKey $SYMBOLS_API_KEY`

---

## 6) Install the Symbols GitHub App (for webhooks/events)

This is for **your server receiving events** (`push`, `pull_request`), audit, UX metadata, etc.

- Install the GitHub App on:
  - the **org** (recommended) or
  - the **specific repo**
- Ensure the app is subscribed to the events you want (at least `push` and `pull_request`).

After install, GitHub will deliver webhooks to:

- `POST /core/connectors/github/app/webhook`

Your server verifies with `X-Hub-Signature-256` using your webhook secret.

### Which GitHub App URL should I install?

It depends on which server environment you selected (the server shown by `smbls servers`):

- **Production** (`api.symbols.app`): `https://github.com/apps/symbols-app`
- **Dev** (dev/local): `https://github.com/apps/symbols-app-dev`
- **Other envs**: `https://github.com/apps/symbols-app-<env_key>`

Where `<env_key>` is typically the subdomain in `https://api.<env_key>.symbols.app`.

---

## 7) Expected behavior after setup

- **Push to any branch**: Actions runs and creates a **new Version** on that branch.
- **Push to `main`**: Actions runs and creates a Version on `main` and updates the Project projection (when server rules only mutate Project for `main`).
- **PR events / merges**: GitHub App webhook events are recorded (async processor updates `Project.metadata.github.*`). Sync still happens via Actions builds.

---

## Troubleshooting checklist

- **Actions failing with 403**: API key missing scope `connectors:github:sync` or secret not set.
- **Webhook 401**: GitHub App webhook secret mismatch or server missing `SYMBOLS_GITHUB_APP_WEBHOOK_SECRET`.
- **Sync “repository mismatch”**: connector was created for a different `OWNER/REPO`.

