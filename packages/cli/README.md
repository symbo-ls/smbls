# @symbo.ls/cli

[![npm version](https://img.shields.io/npm/v/@symbo.ls/cli.svg)](https://www.npmjs.com/package/@symbo.ls/cli)
[![npm downloads](https://img.shields.io/npm/dm/@symbo.ls/cli.svg)](https://www.npmjs.com/package/@symbo.ls/cli)
[![license](https://img.shields.io/npm/l/@symbo.ls/cli.svg)](https://github.com/symbo-ls/smbls/blob/main/LICENSE)
[![node](https://img.shields.io/node/v/@symbo.ls/cli.svg)](https://nodejs.org)
[![ESM](https://img.shields.io/badge/module-ESM-blue)](https://www.npmjs.com/package/@symbo.ls/cli)

> Command-line interface for the [Symbols](https://symbols.app) design platform.

## Installation

```bash
npm install -g @symbo.ls/cli
```

Or use via the `smbls` package:

```bash
npm install smbls
npx smbls <command>
```

## Commands

### Project Setup

#### `smbls init [dest]`

Initialize or add Symbols to a project.

#### `smbls create <dest>`

Create and initialize a new project.

```bash
smbls create my-app
smbls create my-app --package-manager yarn
smbls create my-app --no-dependencies
smbls create my-app --no-clone          # create folder instead of cloning from git
smbls create my-app --clean-from-git    # remove starter-kit git repo (default)
```

| Flag | Description |
|------|-------------|
| `--package-manager <manager>` | Package manager to use (default: npm) |
| `--no-dependencies` | Skip installing dependencies |
| `--no-clone` | Create folder instead of cloning from git |
| `--clean-from-git` | Remove starter-kit git repository |
| `--remote` | Fetch from platform (default: true) |
| `--domql` | Use DOMQL template (default: true) |
| `--verbose` | Verbose output |

#### `smbls install`

Install Symbols into a project.

| Flag | Description |
|------|-------------|
| `-d, --dev` | Run against local server |
| `-f, --fetch` | Fetch config after install (default: true) |
| `--framework <framework>` | Framework to install (domql, react) |
| `-v, --verbose` | Verbose output |

#### `smbls eject`

Eject from `@symbo.ls/runner` to explicit dependencies.

| Flag | Description |
|------|-------------|
| `--no-install` | Skip npm install after ejecting |

### Development

#### `smbls start [entry]`

Start development server.

```bash
smbls start
smbls start src/index.js --port 3000
smbls start --bundler vite --open
```

| Flag | Description |
|------|-------------|
| `-p, --port <port>` | Port to use (default from symbols.json or 1234) |
| `--no-cache` | Disable build cache |
| `--open` | Open browser on start |
| `--bundler <bundler>` | Force bundler: parcel, vite, or browser |

#### `smbls build [entry]`

Build project for production.

```bash
smbls build
smbls build --out-dir build --bundler vite
smbls build --no-optimize --no-brender
```

| Flag | Description |
|------|-------------|
| `--no-cache` | Disable build cache |
| `--no-optimize` | Disable optimization |
| `--no-brender` | Skip brender pre-rendering |
| `--out-dir <dir>` | Output directory (default from symbols.json or dist) |
| `--bundler <bundler>` | Force bundler: parcel, vite, or browser |

#### `smbls deploy`

Deploy project to a hosting provider.

```bash
smbls deploy
smbls deploy --provider cloudflare
smbls deploy --init                   # generate config files only
```

| Flag | Description |
|------|-------------|
| `--provider <provider>` | Deploy target: symbols, cloudflare, vercel, netlify, github-pages |
| `--init` | Initialize deployment config without deploying |
| `--out-dir <dir>` | Output directory for build |
| `--bundler <bundler>` | Force bundler: parcel, vite, or browser |

### Sync & Configuration

#### `smbls fetch`

Fetch Symbols configuration from the platform.

```bash
smbls fetch
smbls fetch --force --yes
smbls fetch --dist-dir src/config
```

| Flag | Description |
|------|-------------|
| `-d, --dev` | Run against local server |
| `-v, --verbose` | Verbose output |
| `--convert` | Convert fetched config (default: true) |
| `--metadata` | Include metadata (default: false) |
| `--force` | Force override local changes |
| `--update` | Override local changes from platform |
| `-y, --yes` | Skip confirmation prompts |
| `--verbose-code` | Verbose code output |
| `--dist-dir <dir>` | Directory to import files to |

#### `smbls sync`

Sync local changes with remote server.

```bash
smbls sync
smbls sync -b feature/new-ui -m "sync latest changes"
```

| Flag | Description |
|------|-------------|
| `-b, --branch <branch>` | Branch to sync |
| `-m, --message <message>` | Commit message |
| `-d, --dev` | Run against local server |
| `-v, --verbose` | Verbose output |

#### `smbls push`

Push changes to the Symbols platform.

```bash
smbls push
smbls push -m "added new components"
```

| Flag | Description |
|------|-------------|
| `-m, --message <message>` | Commit message |

#### `smbls config`

Interactively configure Symbols project settings.

```bash
smbls config
smbls config --dist-dir src/design
```

| Flag | Description |
|------|-------------|
| `--dist-dir <dir>` | Set distDir non-interactively |

### Collaboration

#### `smbls collab`

Connect to real-time collaboration socket and live-sync changes.

```bash
smbls collab
smbls collab -b main --live
smbls collab --debounce-ms 500
```

| Flag | Description |
|------|-------------|
| `-b, --branch <branch>` | Branch to collaborate on |
| `--no-sync-first` | Skip initial sync (not recommended) |
| `-l, --live` | Enable live collaboration mode (default: false) |
| `-d, --debounce-ms <ms>` | Local changes debounce (default: 200ms) |
| `-v, --verbose` | Verbose output |

#### `smbls login`

Sign in to Symbols.

#### `smbls logout`

Sign out of Symbols (clears local credentials).

### Project Management

#### `smbls project`

Project lifecycle management with subcommands:

| Subcommand | Description |
|------------|-------------|
| `create` | Create a new project |
| `link` | Link a project |
| `delete` | Delete a project |
| `update` | Update a project |
| `list` | List projects |
| `libs` | Library management |
| `duplicate` | Duplicate a project |
| `members` | Members management |
| `versions` | Versions management |
| `environments` | Environments management |
| `pipeline` | Pipeline management |
| `restore` | Restore a project |

#### `smbls files`

Upload, download, and manage project files.

| Subcommand | Description |
|------------|-------------|
| `list` | List project-linked files (`--remote`, `--uploads`, `--limit <n>`, `--search <q>`) |
| `upload <paths...>` | Upload files to the project (`--key`, `--visibility`, `--tags`, `--metadata`, `--mime`, `--overwrite`) |
| `download` | Download a project-linked file (`--key`, `--out <path>`, `--remote`) |
| `rm` | Remove a file from the project (`--key`, `--local-only`, `--force-remote`) |

### AI & Tools

#### `smbls ask [question...]`

Chat with AI about your Symbols project.

```bash
smbls ask "how do I add a new page?"
smbls ask                              # interactive chat
smbls ask --init                       # configure AI settings
smbls ask --provider claude --model claude-sonnet-4-20250514
```

| Flag | Description |
|------|-------------|
| `--provider <provider>` | AI provider: claude, openai, gemini, ollama |
| `--model <model>` | Model name |
| `--init` | Configure AI settings and MCP |

### Utilities

#### `smbls clean`

Clean Symbols temp files.

#### `smbls convert [src] [dest]`

Convert DOMQL components to other frameworks.

```bash
smbls convert src/ output/ --react
smbls convert src/ --vue3 --only Button,Input
```

| Flag | Description |
|------|-------------|
| `--react` | Convert to React |
| `--angular` | Convert to Angular |
| `--vue2` | Convert to Vue 2 |
| `--vue3` | Convert to Vue 3 |
| `-t, --tmp-dir <path>` | Temp directory for intermediate files |
| `-o, --only <components>` | Only convert specific components (comma separated) |
| `-m, --merge <dir>` | Recursive merge after converting |
| `-v, --verbose` | Verbose mode |
| `--internal-uikit` | Exclude components from conversion |

#### `smbls migrate`

Migrate a v2 Symbols project to v3.

| Flag | Description |
|------|-------------|
| `--yes` | Skip confirmation prompt |

#### `smbls link-packages`

Link all smbls packages into the project.

| Flag | Description |
|------|-------------|
| `-c, --capture` | Capture and write all package names |
| `-j, --join` | Join all links into one command (default: true) |

#### `smbls servers`

List and switch CLI servers (API base URLs).

| Flag | Description |
|------|-------------|
| `-s, --select` | Interactively select active server |

#### `smbls completion [shell]`

Generate shell completion script for smbls (bash or zsh).

```bash
smbls completion --install    # print install instructions
```

## Documentation

For full documentation visit [symbols.app/developers](https://symbols.app/developers).
