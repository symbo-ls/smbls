# AI Survey App — Project Feedback & Bug Log

Project-specific issues, design decisions, and fixes discovered during development.

---

## Architecture Decisions

### Database: Supabase (remote) over localStorage

**Decision:** Use Supabase REST API for remote shared storage.

**Why not localStorage:**
- Submissions are per-device only — team members can't see each other's results
- Data is lost on browser clear

**Supabase setup required:**
1. Create free project at https://supabase.com
2. Run SQL in the SQL editor (see `smbls/functions/config.js`)
3. Fill in `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `smbls/functions/config.js`

**Table schema (jsonb approach for simplicity):**
```sql
CREATE TABLE survey_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  data jsonb NOT NULL
);
ALTER TABLE survey_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_insert" ON survey_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "public_select" ON survey_submissions FOR SELECT USING (true);
```

**Screenshots not stored in DB** — base64 images are too large for Supabase text columns. Screenshots are shown locally per-session only. Consider Supabase Storage bucket for persistent screenshot uploads.

---

## Bugs Fixed

### 1. Port conflict on startup
**Problem:** Parcel default port 1234 was in use.
**Fix:** Changed `package.json` start script to `parcel index.html --port 3001`.

### 2. Phase tab active states not updating
**Problem:** `onStateUpdate` on PhaseTabs component wasn't reliably firing.
**Fix:** In `switchPhase.js`, directly query `button[data-phase]` DOM elements and update styles without relying on the reactive system.

### 3. "Submit Final Report" button text not changing on Phase 3
**Problem:** `onStateUpdate` on `NextBtn` component wasn't updating `textContent`.
**Fix:** Added `data-next-btn` attribute in `onRender`, then in `switchPhase.js` directly update `querySelector('[data-next-btn]').textContent`.

### 4. Option button active states not reflecting selection
**Problem:** `onStateUpdate` in Phase components wasn't reliably called after `s.update()`.
**Fix:** In each `buildOptionButtons` click handler, directly update all sibling buttons in the same grid — no dependency on `onStateUpdate`.

### 5. Screenshot upload preview not appearing
**Problem:** Same `onStateUpdate` reliability issue — preview images weren't appending.
**Fix:** In `reader.onloadend`, directly create and append `<img>` to the preview div before calling `s.update()`.

### 6. `launch.json` in wrong directory
**Problem:** Claude Preview tool looked for `~www/.claude/launch.json` not `~/www/ai-survey/.claude/launch.json`.
**Fix:** Created `~/www/.claude/launch.json` with a bash wrapper: `cd /Users/nikoloza/www/ai-survey && npm start`.

---

## Design Notes

### View switching
All views (survey/success/dashboard) use DOM ID toggling (`display: none/block`) rather than reactive bindings — more reliable for top-level layout switching.

### Imperative UI pattern
All complex interactive UI (option grids, rating buttons, upload areas) is built imperatively in `onRender` using `el.node` DOM manipulation. This is intentional — DOMQL's declarative syntax works well for layout structure but the `scope` + imperative pattern handles interactive complexity better.

### State shape
State is kept flat (no nested objects) — makes `s.update()` patches simpler and avoids deep merge issues.

---

## Pending Improvements

- [ ] Store screenshots to Supabase Storage bucket (not inline base64)
- [ ] Add user name / email field for attribution
- [ ] Add export to CSV for dashboard data
- [ ] Add chart visualization for aggregated scores (Phase 3 ratings)
- [ ] Mobile layout improvements (Phase content padding on small screens)
