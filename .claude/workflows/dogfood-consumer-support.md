# Dogfood Consumer Support Workflow

Use this workflow when handling issues, feature requests, or improvements reported from consumer projects (DreamStack HQ, Oscar, etc.) that are dogfooding this library.

## When to Use

- Receiving bug reports from consumer projects using @dreamstack-us/kaal or @dreamstack-us/kaal-agenda
- Processing feature requests that originated from real-world usage
- Handling integration issues reported from dogfooding

## Workflow Phases

### Phase 1: Triage Incoming Issue

1. **Understand the Consumer Context**
   - Which consumer project? (dreamstack-hq, oscar, etc.)
   - What were they trying to achieve?
   - Is there a linked consumer ticket?

2. **Classification**
   ```
   Incoming Issue
       |
       +-> Bug
       |     +-> Regression -> High priority
       |     +-> New edge case -> Normal priority
       |     +-> Misuse -> Update docs, educate consumer
       |
       +-> Feature Request
       |     +-> Aligns with library vision -> Plan it
       |     +-> Too specific to consumer -> Suggest workaround
       |     +-> Major API change -> Requires RFC
       |
       +-> API Design Issue
             +-> Breaking change required -> RFC + major version
             +-> Non-breaking enhancement -> Minor version
   ```

3. **Check for Duplicates**
   - Search existing Kaal Linear issues
   - Check if similar issue was discussed before

### Phase 2: Create/Update Library Ticket

**If new ticket needed:**

1. Create in **Kaal Linear project**
2. Use format:
   ```
   Title: [Component] Brief description

   ## Problem to Solve
   [User-facing problem from consumer's perspective]

   ## Consumer Context
   - Consumer project: [name]
   - Consumer ticket: DRE-XXX (if applicable)
   - Use case: [specific scenario]

   ## Proposed Solution
   [Technical approach]

   ## Impact
   - Breaking changes: [yes/no]
   - Affected packages: [@dreamstack-us/kaal, @dreamstack-us/kaal-agenda]
   ```

3. Link tickets:
   - Consumer ticket `blocked by` this library ticket
   - Add label: `dogfood-feedback`

### Phase 3: Implement Fix/Feature

1. **Create feature branch**
   ```bash
   git checkout -b feat/KAAL-XXX/description
   # or
   git checkout -b fix/KAAL-XXX/description
   ```

2. **Follow library patterns**
   - Check existing component patterns in the codebase
   - Follow established type conventions
   - Ensure proper exports in index files
   - Update types if needed

3. **Test locally**
   ```bash
   bun run build
   bun run test  # if applicable
   bun run lint
   ```

4. **Test in consumer project**
   ```bash
   # In kaal
   bun link

   # In consumer (dreamstack-hq, etc.)
   bun link @dreamstack-us/kaal
   # or for specific package
   bun link @dreamstack-us/kaal-agenda
   ```

### Phase 4: PR & Release

1. **Create PR**
   - Reference library ticket (KAAL-XXX)
   - Include consumer context
   - Note any breaking changes

2. **Create changeset**
   ```bash
   bunx changeset
   # Select affected packages
   # Select version bump:
   #   - patch: bug fixes
   #   - minor: new features (non-breaking)
   #   - major: breaking changes
   ```

3. **After merge**: Release triggers via GitHub Actions

4. **Notify consumer**
   - Update consumer ticket with release info
   - Tag relevant team members

### Phase 5: Consumer Verification

1. Consumer updates to new version:
   ```bash
   bun update @dreamstack-us/kaal
   ```

2. Consumer verifies fix works in their context

3. Close both library and consumer tickets

## Anti-Patterns to Avoid

- Implementing features without understanding consumer use case
- Making breaking changes for minor issues
- Forgetting to create changeset
- Not testing in actual consumer project
- Shipping without notifying waiting consumers

## Consumer Directory

| Consumer | Location | Main Usage |
|----------|----------|------------|
| DreamStack HQ | `~/workspace/dreamstack-hq` | Calendar, Agenda views |
| Oscar | `~/workspace/dreamstack-hq/apps/oscar-*` | Event management |

## Package Structure

| Package | Path | npm Package |
|---------|------|-------------|
| Core | `packages/core` | `@dreamstack-us/kaal` |
| Agenda | `packages/agenda` | `@dreamstack-us/kaal-agenda` |

## Related Workflows

- `cross-project-development.md` - Branch naming, commit conventions
- Consumer workflow: `~/workspace/dreamstack-hq/.claude/workflows/dogfood-npm-library.md`
