---
name: update-deps
description: Update npm dependencies, docker-compose image tags, and GitHub Actions versions across this monorepo's workspaces (root, back, front, yuding, docs), syncing package.json ranges to match. Use when the user shares a Renovate Dependency Dashboard issue, asks to update/bump dependencies, or asks to apply Renovate updates.
---

# Update dependencies (kamamoto monorepo)

## Scope: minor/patch only, unless told otherwise

Default to updating **minor and patch versions only** — never bump a major
version without explicit user confirmation. A caret range (`^x.y.z`) already
enforces this: `npm update` will never cross a major boundary on its own.

Before starting, confirm scope with the user only if it's ambiguous (e.g. a
Renovate issue lists both `chore(deps): update X` and `fix(deps): update Y to
vN` major bumps — flag the majors, don't apply them silently).

## Workspaces

This repo has independent `package.json` files (own `node_modules` /
`package-lock.json`) in:

- `.` (root) — 4-space JSON indent
- `back/` — 2-space
- `front/` — 2-space
- `yuding/` — 2-space
- `docs/` — 2-space

Verify this list still matches reality (`ls */package.json`) before running —
a new workspace may have been added since this skill was written.

## Workflow

1. **See what's outdated** in each workspace:
   ```
   npm outdated   # run inside each workspace dir
   ```
   `Wanted` = highest version satisfying the current range (safe, no major
   bump). `Latest` = ignores range, may include majors — do not apply those
   without confirmation.

2. **Update lockfiles + node_modules**, respecting existing ranges:
   ```
   npm update   # run inside each workspace dir
   ```
   This is major-safe by construction (semver ranges block major jumps).

3. **Sync `package.json` ranges** to the versions actually installed, so the
   declared range matches reality (this is what a Renovate PR would do).
   For each workspace:
   ```
   npm list --depth=0 --json > /tmp/list.json   # inside the workspace
   node scripts/bump-pkg.js <path/to/package.json> /tmp/list.json <indent>
   ```
   (`scripts/bump-pkg.js` lives next to this SKILL.md.) This preserves the
   `^`/`~`/exact prefix and the file's original indent width.

4. **Docker / CI versions** — check `docker-compose.yml` (image tags, e.g.
   `mongo:`, `caddy:`) and `.github/workflows/*.yml` (`uses: owner/action@vX`)
   against the Renovate issue's "Detected Dependencies" section. Bump only
   minor/patch tags with `Edit`; skip major action version bumps (e.g.
   `actions/checkout@v5 → v7`) unless confirmed.

5. **Verify nothing broke**:
   ```
   npm run build            # back (tsc)
   npx tsc -p tsconfig.json --noEmit   # front, yuding
   ```
   Also skim `npm audit` output in each workspace — report high/critical
   findings, but don't apply `--force` fixes (those are usually major bumps)
   without confirmation.

6. **Re-run `npm install`** once more per workspace after editing
   `package.json` by hand, to confirm the lockfile stays consistent (no
   unexpected diff beyond what step 2/3 already produced).

7. If files end up staged unexpectedly along the way (this repo has been
   observed auto-staging on save), run `git restore --staged <files>` to
   undo it before the commit step below.

8. **Commit, only if step 5 passed.** Stage exactly the files this workflow
   touched — `package.json`/`package-lock.json` per workspace,
   `docker-compose.yml`, `.github/workflows/*.yml` — and nothing else (check
   `git status` first; don't sweep up unrelated in-progress changes). Commit
   with:
   ```
   chore(deps): bump all dependencies
   ```
   If the build/typecheck failed and wasn't fixed, stop and report — do not
   commit broken state. Do not push.

## Reporting back

Summarize as a diff-shaped list: what got bumped (old → new) per workspace,
what was intentionally skipped (majors, with version numbers), and any
`npm audit` findings left unresolved.
