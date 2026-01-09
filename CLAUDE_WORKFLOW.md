# Claude Workflow - Kaal

This repository uses Claude Code with a structured workflow for component library development.

## Directory Structure

```
.claude/
├── commands/         # Slash commands for common workflows
│   ├── research_codebase.md
│   ├── create_plan.md
│   ├── implement_plan.md
│   ├── validate_plan.md
│   ├── debug.md
│   └── publish_package.md
├── agents/           # Specialized sub-agents
│   ├── library-dev.md
│   ├── perf.md
│   ├── dx.md
│   └── component-pattern-finder.md
├── prompts/          # Context prompts
│   ├── codebase-overview.md
│   └── shared-context.md
└── settings.json     # Plugin configuration

thoughts/
├── shared/           # Team-shared documentation (version controlled)
│   ├── research/     # Codebase research
│   ├── plans/        # Implementation plans
│   ├── decisions/    # Architecture Decision Records
│   └── prs/          # PR documentation
├── srihari/          # Personal workspace (gitignored)
└── searchable/       # Symlink to shared/
```

## Workflow Commands

### `/research_codebase`

Research component patterns, animation logic, and styling system.

```
/research_codebase How does the CalendarGrid animation work?
/research_codebase What patterns are used for platform-specific components?
```

### `/create_plan`

Create implementation plans for new features.

```
/create_plan thoughts/srihari/tickets/add-time-picker.md
/create_plan Add a month picker variant
```

### `/implement_plan`

Execute an approved implementation plan.

```
/implement_plan thoughts/shared/plans/2026-01-05-time-picker.md
```

### `/validate_plan`

Verify implementation correctness.

```
/validate_plan thoughts/shared/plans/2026-01-05-time-picker.md
```

### `/debug`

Debug issues during development.

```
/debug Why is the CalendarGrid not animating?
/debug Metro bundler failing to start
```

### `/publish_package`

Manage changesets and publishing.

```
/publish_package
```

## Agent Specializations

| Agent | Focus | Use For |
|-------|-------|---------|
| `library-dev` | API design, exports | Public API decisions, breaking changes |
| `perf` | Animations, rendering | Performance optimization, bundle size |
| `dx` | Developer experience | Documentation, examples, error messages |
| `component-pattern-finder` | Existing patterns | Finding patterns to follow |

## Validation Checklist

Before merging any PR:

- [ ] `bun run typecheck` passes
- [ ] `bun run lint` passes (Biome)
- [ ] `bun run build` succeeds
- [ ] `bun run size` within 25kB limit
- [ ] `bun test` passes
- [ ] Manual testing via Snack embed or local build

## Best Practices

1. **Research before planning** - Use `/research_codebase` to understand existing patterns
2. **Plan before implementing** - Use `/create_plan` to get approval on approach
3. **Validate after implementing** - Use `/validate_plan` to verify correctness
4. **Use agents for specialized tasks** - Leverage agent expertise
5. **Document decisions** - Save ADRs to `thoughts/shared/decisions/`

## Document Naming

| Type | Format | Location |
|------|--------|----------|
| Research | `YYYY-MM-DD-topic.md` | `thoughts/shared/research/` |
| Plans | `YYYY-MM-DD-DRE-XXX-description.md` | `thoughts/shared/plans/` |
| Decisions | `YYYY-MM-DD-ADR-XXX-description.md` | `thoughts/shared/decisions/` |

## Linear Integration

Include ticket IDs in commit messages for automation:

```bash
git commit -m "DRE-290: add time picker component"
```
