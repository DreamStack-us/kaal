# Create Plan

You are tasked with creating detailed implementation plans for the Kaal DatePicker library.

## Initial Response

1. Check if a ticket file path was provided as argument
2. If yes, read the ticket file completely
3. If no, ask what feature/change needs planning

## Kaal-Specific Considerations

### Library API Design
- Consider public API surface area
- Ensure TypeScript types are comprehensive
- Follow React Native component conventions
- Consider tree-shaking and bundle size (<25kB limit)

### Platform Considerations
- Plan for iOS, Android, and Web implementations
- Consider native picker integration (`@expo/ui`)
- Handle platform-specific animations

### Performance Requirements
- Reanimated worklets for animations
- FlatList optimization for calendar grids
- Memoization strategies (React.memo, useCallback, useMemo)

## Plan Template

Save plan to: `thoughts/shared/plans/YYYY-MM-DD-{description}.md`

```markdown
---
date: YYYY-MM-DD
author: claude
ticket: {DRE-XXX if applicable}
status: draft
---

# {Feature/Change Title}

## Overview
{Brief description of what will be implemented}

## Phases

### Phase 1: Type Definitions
- [ ] Define props interface
- [ ] Add Temporal types
- [ ] Export types from index

### Phase 2: Core Component
- [ ] Create base component
- [ ] Implement hooks
- [ ] Add platform files (.ios.tsx, .android.tsx, .web.tsx)

### Phase 3: Styling
- [ ] Unistyles stylesheet
- [ ] Theme token integration

### Phase 4: Testing & Validation
- [ ] Unit tests
- [ ] Type tests
- [ ] Example app integration

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `packages/core/src/...` | Create | ... |

## Success Criteria

### Automated Verification
- [ ] `bun run typecheck` passes
- [ ] `bun run lint` passes (Biome)
- [ ] `bun run build` succeeds
- [ ] `bun run size` within 25kB limit
- [ ] `bun test` passes

### Manual Verification
- [ ] Component renders correctly (test via Snack embed)
- [ ] Animations are smooth (60fps)
- [ ] Platform behavior is correct
- [ ] Theme switching works
```

## After Creating Plan

1. Ask user to review the plan
2. Make adjustments based on feedback
3. Mark plan status as `approved` when ready
