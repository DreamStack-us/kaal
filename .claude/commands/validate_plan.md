# Validate Plan

Validate that an implementation plan was correctly executed.

## Validation Steps

### 1. Automated Checks

```bash
# Type Safety
bun run typecheck

# Code Quality (Biome)
bun run lint

# Build All Packages
bun run build

# Bundle Size (<25kB for core)
bun run size

# Tests
bun test
```

### 2. Export Verification

Check that all public APIs are exported from `packages/core/src/index.ts`:

```bash
# List all exports
grep -E "^export" packages/core/src/index.ts
```

### 3. Platform Coverage

Verify platform-specific files exist where needed:
- `.ios.tsx` - iOS implementation
- `.android.tsx` - Android implementation
- `.web.tsx` - Web implementation

### 4. Type Coverage

Check that props interfaces are complete:
- All props have TypeScript types
- Optional props are marked with `?`
- Types are exported alongside components

### 5. Theme Integration

Verify Unistyles tokens are used correctly:
- No hardcoded colors
- Theme values accessed via `theme.colors.*`, `theme.spacing.*`

## Validation Report

Generate report to: `thoughts/shared/plans/YYYY-MM-DD-{plan-name}-validation.md`

```markdown
# Validation Report: {Plan Name}

## Automated Checks

| Check | Status | Notes |
|-------|--------|-------|
| TypeCheck | PASS/FAIL | |
| Lint | PASS/FAIL | |
| Build | PASS/FAIL | |
| Size | {size}/25kB | |
| Tests | PASS/FAIL | |

## Export Audit

### Public Components
- [ ] ComponentName

### Public Hooks
- [ ] useHookName

### Public Types
- [ ] TypeName

## Platform Coverage

| Component | iOS | Android | Web |
|-----------|-----|---------|-----|
| ComponentName | file.ios.tsx | file.android.tsx | file.web.tsx |

## Manual Testing Required

- [ ] Component renders in expo-example
- [ ] Animations smooth on device
- [ ] Theme switching works
- [ ] Edge cases handled

## Issues Found

{List any issues discovered}

## Conclusion

{APPROVED / NEEDS_CHANGES}
```
