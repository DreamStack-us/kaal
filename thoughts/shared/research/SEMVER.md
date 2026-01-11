# Semantic Versioning Guide for Kaal

## TL;DR - Current Practice (Alpha Phase)

We're in **0.0.x alpha**. Use `patch` for everything until we're ready for beta.

```
0.0.2 → 0.0.3  (patch) - New features, bug fixes, anything
0.0.x → 0.1.0  (minor) - Major milestone, significant breaking change
0.x.x → 1.0.0  (major) - Stable public release
```

---

## Semver Basics: MAJOR.MINOR.PATCH

```
1.4.2
│ │ │
│ │ └── PATCH: Bug fixes, no API changes
│ └──── MINOR: New features, backwards compatible
└────── MAJOR: Breaking changes
```

---

## The 0.x.x Exception (Pre-1.0)

**Standard semver rules don't fully apply before 1.0.0.**

From [semver.org](https://semver.org):
> Major version zero (0.y.z) is for initial development. Anything MAY change at any time. The public API SHOULD NOT be considered stable.

### What This Means

| Version | Stability | API Contract |
|---------|-----------|--------------|
| `0.0.x` | Alpha | No guarantees, expect changes |
| `0.x.x` | Beta | More stable, but still evolving |
| `1.x.x` | Stable | Full semver rules apply |

---

## Kaal Versioning Strategy

### Phase 1: Alpha (0.0.x) - Current

**Use `patch` for everything.**

```
0.0.1 → 0.0.2 → 0.0.3 → 0.0.4 ...
```

- New features? **patch**
- Bug fixes? **patch**
- Breaking changes? **patch** (document in changelog)
- API additions? **patch**

**Why?** We're iterating fast. Consumers know 0.0.x means "unstable, use at your own risk."

**When to bump to 0.1.0:**
- Core API is stabilizing
- Ready for broader beta testing
- Major architectural milestone

### Phase 2: Beta (0.x.x)

**Start using minor for features, patch for fixes.**

```
0.1.0 → 0.1.1 (fix) → 0.2.0 (feature) → 0.2.1 (fix)
```

- New features? **minor**
- Bug fixes? **patch**
- Breaking changes? **minor** (with deprecation warnings)

**When to bump to 1.0.0:**
- API is stable and documented
- Production-ready
- Committed to backwards compatibility

### Phase 3: Stable (1.x.x)

**Full semver rules apply.**

```
1.0.0 → 1.0.1 (fix) → 1.1.0 (feature) → 2.0.0 (breaking)
```

- Bug fixes? **patch**
- New features (backwards compatible)? **minor**
- Breaking changes? **major**

---

## Practical Examples for Kaal

### Always PATCH (0.0.x alpha)

| Change | Version | Reason |
|--------|---------|--------|
| Add `selectionMode="range"` prop | 0.0.2 → 0.0.3 | New feature in alpha |
| Fix date comparison bug | 0.0.3 → 0.0.4 | Bug fix |
| Rename `onDateChange` to `onChange` | 0.0.4 → 0.0.5 | Breaking, but alpha |
| Add TimePicker component | 0.0.5 → 0.0.6 | New component |
| Remove deprecated prop | 0.0.6 → 0.0.7 | Breaking, but alpha |

### MINOR (0.x.x beta)

| Change | Version | Reason |
|--------|---------|--------|
| Add new component | 0.1.0 → 0.2.0 | New feature |
| Add optional prop | 0.2.0 → 0.3.0 | New feature |
| Fix bug | 0.3.0 → 0.3.1 | Patch for fix |
| Deprecate prop (still works) | 0.3.1 → 0.4.0 | Minor with warning |

### MAJOR (1.x.x stable)

| Change | Version | Reason |
|--------|---------|--------|
| Remove deprecated prop | 1.0.0 → 2.0.0 | Breaking |
| Change required prop type | 1.0.0 → 2.0.0 | Breaking |
| New optional feature | 1.0.0 → 1.1.0 | Minor |
| Bug fix | 1.1.0 → 1.1.1 | Patch |

---

## Changeset Cheat Sheet

```bash
# Check what needs a changeset
git diff --name-only main..HEAD | grep "packages/core/src"

# Create changeset
bun changeset

# Or manually create .changeset/descriptive-name.md:
```

```markdown
---
"@dreamstack-us/kaal": patch
---

Brief description of what changed
```

---

## Common Mistakes

### 1. Bumping minor for every feature in 0.0.x
❌ `0.0.1 → 0.1.0` for adding a prop
✅ `0.0.1 → 0.0.2` - stay in patch during alpha

### 2. Using major before 1.0.0
❌ `0.5.0 → 1.0.0` just because it feels "done enough"
✅ Only go 1.0.0 when committed to API stability

### 3. Forgetting changesets entirely
❌ Merge PR without changeset, no release happens
✅ Always check if `packages/core/src` changed → needs changeset

### 4. Over-engineering version numbers
❌ "This is a big feature, should be 0.1.0"
✅ In alpha, size doesn't matter. Use patch. Ship fast.

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────┐
│                    KAAL VERSIONING                      │
├─────────────────────────────────────────────────────────┤
│  0.0.x (ALPHA)  │  patch for everything                │
│  0.x.x (BETA)   │  minor=features, patch=fixes         │
│  1.x.x (STABLE) │  major=breaking, minor=features      │
└─────────────────────────────────────────────────────────┘
```
