<!-- ccw-template-version: 1.0.0 -->
<!-- ccw-template-name: describe_pr -->
<!-- ccw-last-updated: 2025-10-13 -->
# Generate PR Description

You are tasked with generating a comprehensive pull request description for the Kaal library.

## Steps to follow:

1. **Identify the PR to describe:**
   - Check if the current branch has an associated PR: `gh pr view --json url,number,title,state 2>/dev/null`
   - If no PR exists for the current branch, list open PRs: `gh pr list --limit 10 --json number,title,headRefName,author`
   - Ask the user which PR they want to describe

2. **Gather comprehensive PR information:**
   - Get the full PR diff: `gh pr diff {number}`
   - Get commit history: `gh pr view {number} --json commits`
   - Review the base branch: `gh pr view {number} --json baseRefName`
   - Get PR metadata: `gh pr view {number} --json url,title,number,state`

3. **Analyze the changes thoroughly:**
   - Read through the entire diff carefully
   - For context, read any files that are referenced but not shown in the diff
   - Understand the purpose and impact of each change
   - Identify user-facing changes vs internal implementation details
   - Look for breaking changes or migration requirements
   - Check which packages are affected (core, agenda)

4. **Handle verification requirements:**
   - Run verification steps when possible:
     - `bun run build` - Build all packages
     - `bun run lint` - Linting
     - `bun run test` - Tests
     - `bun run typecheck` - Type checking
   - Mark checkboxes as checked if they pass
   - Note any failures or steps requiring manual testing

5. **Generate the description:**

   **PR Description Format for Kaal:**
   ```markdown
   ## What does this PR do?
   [Brief description of the changes]

   ## Why are we doing this?
   [Context and motivation - include consumer use case if from dogfooding]

   ## Packages Affected
   - [ ] `@dreamstack-us/kaal` (core)
   - [ ] `@dreamstack-us/kaal-agenda`

   ## What changed?
   - [Key change 1]
   - [Key change 2]
   - [Key change 3]

   ## Breaking Changes
   [List any breaking changes, or "None"]

   ## Migration Guide (if breaking)
   ```typescript
   // Before
   <Component oldProp="value" />

   // After
   <Component newProp="value" />
   ```

   ## How to verify it
   - [ ] Build succeeds: `bun run build`
   - [ ] Lint passes: `bun run lint`
   - [ ] Tests pass: `bun run test`
   - [ ] Types check: `bun run typecheck`
   - [ ] Bundle size within limits: `bun run size`
   - [ ] Manual testing: [specific steps]

   ## Consumer Testing (if applicable)
   - [ ] Tested in dreamstack-hq
   - [ ] Tested in oscar

   ## Related Issues/PRs
   - Closes KAAL-XXX
   - Related to DRE-XXX (consumer ticket)

   ## Changeset
   - [ ] Changeset created with appropriate version bump
   ```

6. **Save and update the PR:**
   - Write to temporary file if needed
   - Update PR: `gh pr edit {number} --body-file /tmp/pr_description.md`
   - Confirm update was successful
   - Remind about any uncompleted verification steps

## Important notes:
- Be thorough but concise - descriptions should be scannable
- Focus on the "why" as much as the "what"
- Include any breaking changes or migration notes prominently
- Always check which packages are affected
- Note if this is from consumer dogfooding feedback
- Include changeset reminder for version bumping
