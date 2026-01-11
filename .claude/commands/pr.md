<!-- ccw-template-version: 1.0.0 -->
<!-- ccw-template-name: pr -->
<!-- ccw-last-updated: 2025-01-10 -->
# Create Pull Request with Stacked Comments

You are tasked with creating a complete pull request, including committing/pushing changes and adding stacked ticket comments for meaningful work.

## Process:

### Phase 1: Commit & Push All Changes

1. **Review current state:**
   ```bash
   git status
   git diff --stat
   git log main..HEAD --oneline
   ```

2. **Stage and commit any unstaged changes:**
   - Group related changes into logical commits
   - Use conventional commit format: `type(scope): description`
   - **NEVER add co-author or Claude attribution**

3. **Push to remote:**
   ```bash
   git push -u origin HEAD
   ```

### Phase 2: Create or Update PR

1. **Check if PR exists:**
   ```bash
   gh pr view --json url,number,title 2>/dev/null
   ```

2. **If no PR exists, create one using the template at `.github/PULL_REQUEST_TEMPLATE.md`:**
   - Identify the Linear ticket(s) from branch name or conversation context (e.g., `DRE-XXX`)
   - Fill in the PR description with:
     - Summary of all tickets in PR
     - Branch strategy (one commit per ticket vs multiple)
     - Primary ticket details (changes, testing steps, edge cases)
     - Deployment notes if applicable

   ```bash
   gh pr create --title "feat(scope): description" --body-file /tmp/pr_body.md
   ```

### Phase 3: Add Stacked Ticket Comments

For each **meaningful commit** in the PR, add a comment using `.github/STACKED_TICKET_COMMENT_TEMPLATE.md`.

**IMPORTANT: Skip comments for cleanup work:**
- Lint fixes
- Test fixes
- Compile/type fixes
- Formatting changes
- Simple dependency updates
- CI configuration tweaks

These are considered housekeeping and don't need individual ticket comments.

**DO add comments for:**
- New features or functionality
- Bug fixes that change behavior
- API changes
- Breaking changes
- Significant refactors
- Documentation updates for new features

**For each meaningful commit/ticket:**

1. **Extract the ticket ID** from commit message or branch name
2. **Gather commit info:**
   ```bash
   git log --format="%h %s" main..HEAD
   ```
3. **Create comment using template format:**

```markdown
<!-- OSCAR_TICKET_WORK: DRE-XXX -->
## DRE-XXX: [Ticket Title]

**Commit(s):** `abc1234`, `def5678`

### Changes
- [ ] UI/Frontend changes
- [ ] API/Backend changes
- [ ] Database/Schema changes
- [ ] Configuration changes

### Prerequisites
- [ ] Previous ticket work must pass first
- [ ] Additional setup: [describe if needed]

### Testing Steps

1. Navigate to `...`
2. ...
3. **Expected:** ...

### Visual Checkpoints

- `[DRE-XXX-initial]` State before changes
- `[DRE-XXX-complete]` State after changes

### Edge Cases

- [ ] Empty inputs handled
- [ ] Error states display correctly
- [ ] Loading states shown

---
<!-- /OSCAR_TICKET_WORK -->
```

4. **Post the comment:**
   ```bash
   gh pr comment {number} --body-file /tmp/ticket_comment.md
   ```

### Phase 4: Summary

1. **Display the PR URL**
2. **List all tickets documented:**
   - Primary ticket in PR description
   - Additional tickets as comments
3. **Note any commits that were skipped** (cleanup/lint/test fixes)

## Commit Classification Guide

| Commit Type | Add Comment? | Example |
|-------------|--------------|---------|
| `feat(*)` | YES | New component, new prop, new API |
| `fix(*)` behavior change | YES | Bug fix that changes how something works |
| `fix(*)` compile/lint | NO | Type error fix, lint warning fix |
| `docs(*)` for features | YES | New API documentation |
| `docs(*)` typo/format | NO | Fixing typos, reformatting |
| `refactor(*)` significant | YES | Architecture change, moving code |
| `refactor(*)` minor | NO | Rename variable, cleanup |
| `test(*)` | NO | Adding/fixing tests |
| `style(*)` | NO | Formatting, semicolons |
| `build(*)` | NO | Build configuration |
| `ci(*)` | NO | CI configuration |
| `chore(*)` | NO | Dependencies, configs |

## Example Workflow

```
User: /pr

Claude:
1. Found 5 unstaged files, creating commit...
   ✓ Committed: "feat(docs): add npm install box and TypeScript icon"
   ✓ Pushed to origin/fix/DRE-446-web-compatibility

2. Creating PR...
   ✓ PR #5 created: https://github.com/DreamStack-us/kaal/pull/5

3. Analyzing commits for stacked comments...
   - abc1234 "feat(core): add weekStartsOn prop" → Adding comment for DRE-446
   - def5678 "docs(docs): update all examples" → Adding comment for DRE-446
   - ghi9012 "fix(core): lint errors" → Skipping (cleanup)

4. Summary:
   PR: https://github.com/DreamStack-us/kaal/pull/5
   Tickets documented:
   - DRE-446 (primary + 2 comments)
   Skipped: 1 cleanup commit
```

## Important Notes:
- Always check the branch is up to date before pushing
- Never force push without explicit user confirmation
- If unsure whether a commit is "meaningful", ask the user
- Group related commits for the same ticket into one comment
- The primary ticket goes in PR description, additional tickets as comments
