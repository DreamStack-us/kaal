# Debug

Help debug issues during Kaal development.

## Common Issues & Solutions

### Metro Bundler Issues

```bash
# Reset Metro completely
rm -rf node_modules/.cache
watchman watch-del-all  # if using watchman
```

### Turbo Cache Issues

```bash
# Clear Turbo cache
rm -rf .turbo
bun run clean
bun install
```

### bob build Issues

```bash
# Rebuild specific package
cd packages/core && rm -rf lib && bun run build

# Rebuild all packages
bun run build --filter='./packages/*' --force
```

### TypeScript Issues

```bash
# Check for type errors
bun run typecheck

# Generate fresh types
cd packages/core && rm -rf lib/typescript && bun run build
```

### Biome Lint Issues

```bash
# Check lint errors
bun run lint

# Auto-fix
bun run lint -- --write
```

## Platform-Specific Debugging

### iOS Issues

1. Check Xcode logs
2. Verify Podfile.lock is up to date
3. Check expo-modules-autolinking
4. Clear derived data: `rm -rf ~/Library/Developer/Xcode/DerivedData`

### Android Issues

1. Check Logcat: `adb logcat`
2. Verify Gradle sync
3. Check native dependencies in `android/app/build.gradle`
4. Clean build: `cd android && ./gradlew clean`

### Web Issues

1. Check browser console
2. Verify react-native-web compatibility
3. Check for missing web implementations

## Unistyles Issues

1. Verify babel.config.js plugin order
2. Check theme registration in unistyles.ts
3. Verify StyleSheet import is from 'react-native-unistyles'

## Debugging Workflow

1. **Reproduce the issue** - Get exact steps
2. **Check error messages** - Read full stack trace
3. **Identify the source** - Component, hook, or utility?
4. **Add logging** - Use console.log strategically
5. **Test fix** - Verify via Snack embed or local build
6. **Clean up** - Remove debug logs before committing
