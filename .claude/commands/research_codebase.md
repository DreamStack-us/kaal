# Research Codebase

You are tasked with conducting comprehensive research across the Kaal DatePicker library codebase.

## Kaal Context

Kaal is a high-performance React Native DatePicker library with:
- **Core Library**: `packages/core` - Main DatePicker components
- **Theme System**: `packages/themes` - Unistyles v3 theming
- **Example App**: `apps/expo-example` - Demo and testing app

## Key Areas to Research

| Area | Location | Focus |
|------|----------|-------|
| Components | `packages/core/src/components/` | DatePicker, CalendarGrid, WheelPicker |
| Animations | `*.tsx` files | Reanimated patterns, gesture handlers |
| Platform code | `.ios.tsx`, `.android.tsx`, `.web.tsx` | Native implementations |
| Styling | `packages/themes/src/` | Unistyles v3, tokens, themes |
| Hooks | `packages/core/src/hooks/` | useDatePicker, useCalendar |
| Types | `packages/core/src/types/` | TypeScript definitions |
| Date handling | `packages/core/src/utils/temporal.ts` | Temporal API usage |

## Research Process

1. **Read directly mentioned files first**
2. **Analyze and decompose the research question**
3. **Spawn parallel sub-agent tasks:**
   - Use `component-pattern-finder` for React Native component patterns
   - Use `codebase-analyzer` for implementation details
4. **Wait for sub-agents and synthesize findings**
5. **Generate research document**

## Output Format

Save research to: `thoughts/shared/research/YYYY-MM-DD-{topic}.md`

```markdown
---
date: YYYY-MM-DD
researcher: claude
git_commit: {current commit hash}
branch: {current branch}
repository: kaal
topic: {research topic}
tags: [relevant, tags]
status: complete
---

# {Research Topic}

## Summary
{2-3 sentence summary}

## Findings

### {Finding 1}
{Details with file:line references}

### {Finding 2}
{Details with file:line references}

## Code Examples
{Relevant code snippets}

## Recommendations
{If applicable}
```

## CRITICAL

Your job is to **document and explain the codebase as it exists today**. Do not suggest changes unless explicitly asked.
