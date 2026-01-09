#!/usr/bin/env node

/**
 * Dual-scope npm publish script
 *
 * This script publishes unscoped versions of packages after changesets
 * has published the scoped (@dreamstack-us/*) versions.
 *
 * For each package:
 * 1. Reads the current version from package.json
 * 2. Temporarily changes the name to the unscoped version
 * 3. Publishes to npm with --provenance --access public
 * 4. Restores the original package.json
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const packages = [
  {
    dir: "packages/core",
    scopedName: "@dreamstack-us/kaal",
    unscopedName: "kaal",
  },
  {
    dir: "packages/themes",
    scopedName: "@dreamstack-us/kaal-themes",
    unscopedName: "kaal-themes",
  },
];

async function publishUnscoped() {
  console.log("Publishing unscoped package versions...\n");

  for (const pkg of packages) {
    const pkgJsonPath = join(pkg.dir, "package.json");
    const original = readFileSync(pkgJsonPath, "utf-8");
    const pkgJson = JSON.parse(original);
    const version = pkgJson.version;

    console.log(`Publishing ${pkg.unscopedName}@${version}...`);

    // Update name to unscoped
    pkgJson.name = pkg.unscopedName;
    writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n");

    try {
      execSync("npm publish --provenance --access public", {
        cwd: pkg.dir,
        stdio: "inherit",
      });
      console.log(`Published ${pkg.unscopedName}@${version}\n`);
    } catch (error) {
      console.error(`Failed to publish ${pkg.unscopedName}`);
      // Restore original before throwing
      writeFileSync(pkgJsonPath, original);
      process.exit(1);
    }

    // Restore original package.json
    writeFileSync(pkgJsonPath, original);
  }

  console.log("\nAll unscoped packages published successfully!");
}

publishUnscoped();
