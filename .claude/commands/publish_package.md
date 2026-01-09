# Publish Package

Manage changesets and package publishing for Kaal.

## Pre-Publish Checklist

Before publishing, ensure:

- [ ] All tests pass: `bun test`
- [ ] Type checking passes: `bun run typecheck`
- [ ] Lint passes: `bun run lint`
- [ ] Build succeeds: `bun run build`
- [ ] Bundle size within limits: `bun run size` (<25kB)
- [ ] CHANGELOG is updated
- [ ] README examples work
- [ ] Snack embeds in docs demonstrate features

## Changeset Workflow

### 1. Create Changeset

When you've made changes that should be released:

```bash
bun run changeset
```

Select:
- **Package(s)** to include
- **Bump type**: patch (bug fix), minor (feature), major (breaking)
- **Summary**: Describe the change for CHANGELOG

### 2. Review Changesets

Check `.changeset/` for pending changesets:

```bash
ls .changeset/*.md
```

### 3. Version Packages

Update versions based on changesets:

```bash
bun run version-packages
```

This will:
- Update package.json versions
- Update CHANGELOG.md files
- Delete consumed changesets

### 4. Publish

Publish to registry:

```bash
bun run release
```

## Version Guidelines

| Change Type | Bump | Example |
|-------------|------|---------|
| Bug fix | patch | 0.0.1 -> 0.0.2 |
| New feature (non-breaking) | minor | 0.0.2 -> 0.1.0 |
| Breaking change | major | 0.1.0 -> 1.0.0 |

## Publishing Targets

### Phase 1: GitHub Packages (Private)

Current setup publishes to GitHub Packages:
- Registry: `https://npm.pkg.github.com/`
- Access: restricted

### Phase 2: npm (Public) - Future

When ready for public release:
1. Update `publishConfig.access` to `public`
2. Update `publishConfig.registry` to npm
3. Create alias packages (`kaaljs`, `kaaljs-themes`)

## CI/CD

Automated releases via `.github/workflows/release.yml`:
- Triggered on push to main
- Creates version PRs via changesets/action
- Publishes on merge

## Troubleshooting

### Authentication Issues

```bash
# Verify npm auth
npm whoami --registry=https://npm.pkg.github.com/

# Re-authenticate
echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc
```

### Version Conflicts

```bash
# Reset versions
git checkout -- packages/*/package.json
bun run version-packages
```
