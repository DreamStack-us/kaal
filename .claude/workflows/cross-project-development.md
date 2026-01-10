# Cross-Project Development Workflow

When changes in this library need to be tested in consumer projects (DreamStack HQ, Oscar, etc.), follow this workflow to ensure proper ticket tracking and coordination.

## Library-to-Consumer Development Flow

### 1. Ticket-First Approach

**Before starting work:**

1. Ensure a Linear ticket exists in the Kaal project
2. Get the ticket ID (e.g., KAAL-123)
3. Create branch: `feat/KAAL-123/description` or `fix/KAAL-123/description`
4. If triggered by consumer issue, link the tickets

### 2. Local Development with Consumer Testing

```bash
# 1. Make changes in kaal
cd ~/workspace/kaal
git checkout -b feat/KAAL-123/feature-name

# 2. Build the library
bun run build

# 3. Link for local testing
bun link
# For specific package:
cd packages/agenda && bun link

# 4. In consumer project, link the local version
cd ~/workspace/dreamstack-hq
bun link @dreamstack-us/kaal
# or
bun link @dreamstack-us/kaal-agenda

# 5. Test in consumer
bun run dev

# 6. When done, unlink
bun unlink @dreamstack-us/kaal
bun install  # restore npm version
```

### 3. Branch Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feat/KAAL-XXX/description` | `feat/KAAL-42/add-week-view` |
| Bug Fix | `fix/KAAL-XXX/description` | `fix/KAAL-99/timezone-offset` |
| Refactor | `refactor/KAAL-XXX/description` | `refactor/KAAL-15/simplify-api` |

### 4. Commit Messages

Always reference the ticket:

```bash
git commit -m "feat(agenda): add week view component (KAAL-42)"
git commit -m "fix(core): correct timezone offset calculation (KAAL-99)"
```

Format: `type(scope): description (TICKET-ID)`

Scopes for this repo:
- `core` - packages/core
- `agenda` - packages/agenda
- `docs` - documentation
- `ci` - CI/CD changes
- `build` - build system changes

### 5. Coordinating with Consumer Tickets

When your library change relates to a consumer issue:

1. **Library ticket** (in Kaal project):
   - Describes the library-level change
   - Contains technical implementation details

2. **Consumer ticket** (in DreamStack project):
   - Describes the user-facing problem
   - Blocked by the library ticket
   - Will be unblocked when library releases

3. **Link them**:
   - Consumer ticket `blocked by` Library ticket
   - Library ticket `blocks` Consumer ticket

### 6. Release Coordination

After your PR is merged:

1. Changeset creates a version PR automatically
2. When version PR merges, packages publish to npm
3. Update consumer project:
   ```bash
   cd ~/workspace/dreamstack-hq
   bun update @dreamstack-us/kaal
   ```
4. Verify fix works in consumer
5. Close consumer ticket

## Testing Checklist

Before creating PR:

- [ ] Library builds successfully (`bun run build`)
- [ ] Linting passes (`bun run lint`)
- [ ] Tests pass (`bun run test`)
- [ ] Tested in at least one consumer project
- [ ] Changeset created (`bunx changeset`)
- [ ] Types exported correctly

## Related Projects

| Project | Location | Role |
|---------|----------|------|
| Kaal (this repo) | `~/workspace/kaal` | Library |
| DreamStack HQ | `~/workspace/dreamstack-hq` | Consumer |
| SectionFlow | `~/workspace/SectionFlow` | Related Library |
