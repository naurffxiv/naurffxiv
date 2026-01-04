import chalk from "chalk";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import readline from "readline";

const cwd = process.cwd();

const ROUTES_FILE = path.join(cwd, "src/auth/middleware/routes.config.ts");
const ROUTE_ROLES_FILE = path.join(cwd, "src/auth/core/routeRoles.ts");
const MIDDLEWARE_FILE = path.join(cwd, "src/middleware.ts");

function readFileOrExit(filePath: string, label: string): string {
  if (!fs.existsSync(filePath)) {
    console.error(chalk.red(`${label} file not found at: ${filePath}`));
    process.exit(1);
  }
  return fs.readFileSync(filePath, "utf8");
}

/**
 * Extracts protected routes from routes.config.ts
 * Tries two regex patterns to handle different syntax styles
 */
function getProtectedRoutes(): string[] {
  const content = readFileOrExit(ROUTES_FILE, "Routes");

  const regexes = [
    // Pattern 1: export const protectedRoutes: readonly string[] = [ ... ]
    // Captures array contents between brackets, handles multiline with [\s\S]*?
    /export\s+const\s+protectedRoutes\s*:\s*readonly\s*string\[\]\s*=\s*\[([\s\S]*?)\]/m,

    // Pattern 2: export const protectedRoutes = [ ... ] as const
    // Alternative syntax without explicit type annotation
    /export\s+const\s+protectedRoutes\s*=\s*\[([\s\S]*?)\]\s*as\s+const/m,
  ];
  // TODO(#346): Centralize regex parsing logic in shared helper
  for (const regex of regexes) {
    const match = regex.exec(content);
    if (match) {
      return match[1]
        .split(",") // Split by comma to get individual routes
        .map((s) => s.trim().replace(/^['"`]|['"`]$/g, "")) // Trim whitespace and remove quotes from start/end
        .filter(Boolean);
    }
  }

  throw new Error("Couldn't find protectedRoutes array");
}

/**
 * Extracts matchers from middleware.ts
 * Searches for the matcher array configuration
 */
function getMiddlewareMatchers(): string[] {
  const content = readFileOrExit(MIDDLEWARE_FILE, "Middleware");

  // Matches: matcher: [ ... ]
  // ((?:.|\n)*?) = non-greedy capture of any character including newlines
  const match = /matcher:\s*\[((?:.|\n)*?)\]/m.exec(content);

  if (!match) return [];
  // TODO(#346): Centralize regex parsing logic in shared helper
  return match[1]
    .split(",")
    .map((s) => s.trim().replace(/^['"`]|['"`]$/g, "")) // Trim whitespace and remove quotes from start/end
    .filter(Boolean);
}

/**
 * Extracts route role keys from routeRoles.ts
 * Parses the routeRoleAccessMap object to find all defined routes
 */
function getRouteRoleKeys(): string[] {
  const fileContent = readFileOrExit(ROUTE_ROLES_FILE, "routeRoles");

  // Matches: export const routeRoleAccessMap = { ... } as const
  // ([\s\S]*?) = captures everything inside the object braces
  // (?::[^=]+)? = optional type annotation
  // (?:as\s+const)? = optional 'as const' modifier
  const ROLE_MAP_REGEX =
    /export\s+const\s+routeRoleAccessMap\s*(?::[^=]+)?=\s*{([\s\S]*?)}\s*(?:as\s+const)?/m;
  const match = ROLE_MAP_REGEX.exec(fileContent);

  if (!match) {
    console.error(chalk.red("Failed to parse routeRoleAccessMap"));
    console.log(chalk.gray("First 300 chars of file:"));
    console.log(fileContent.slice(0, 300));
    process.exit(1);
  }

  // Matches route keys in format: '/route/path': ...
  // \/[a-zA-Z0-9\-_/]+ = matches paths like /admin, /dashboard/settings, etc.
  // ['"`]? = optional quotes around the key
  return Array.from(
    match[1].matchAll(/\s*['"`]?(\/[a-zA-Z0-9\-_/]+)['"`]?:/g),
    (m) => m[1],
  );
}

function findDuplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const v of values) {
    if (seen.has(v)) duplicates.add(v);
    seen.add(v);
  }
  return [...duplicates];
}

const formatPathWithSource = (path: string, sourceFile: string): string =>
  `${path} ${chalk.gray(`(from ${sourceFile.replace(cwd, "")})`)}`;

function askUserYesNo(question: string): Promise<boolean> {
  return new Promise((resolve) => {
    const readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readlineInterface.question(
      chalk.yellowBright.bold(
        `\n  ${question}\nPress ${chalk.green("Y")} to confirm or ${chalk.gray("N")} to skip: `,
      ),
      (answer) => {
        readlineInterface.close();
        const normalized = answer.trim().toLowerCase();
        resolve(normalized === "" || normalized === "y");
      },
    );
  });
}

async function validate(): Promise<void> {
  const protectedRoutes = getProtectedRoutes();
  const matchers = getMiddlewareMatchers();
  const routeRoles = getRouteRoleKeys();

  const expectedMatchers = protectedRoutes.map((r) => `${r}/:path*`);

  // Find discrepancies between all three configuration sources
  const missingInMiddleware = expectedMatchers.filter(
    (r) => !matchers.includes(r),
  );
  const extraInMiddleware = matchers.filter(
    (m) => !expectedMatchers.includes(m),
  );
  const missingInRouteRoles = protectedRoutes.filter(
    (r) => !routeRoles.includes(r),
  );
  const extraInRouteRoles = routeRoles.filter(
    (r) => !protectedRoutes.includes(r),
  );

  // Find any duplicated entries
  const duplicateProtectedRoutes = findDuplicates(protectedRoutes);
  const duplicateMatchers = findDuplicates(matchers);
  const duplicateRoleMappings = findDuplicates(routeRoles);

  let hasProblems = false;

  if (duplicateProtectedRoutes.length) {
    console.log(chalk.red("Duplicate entries in protectedRoutes:\n"));
    duplicateProtectedRoutes.forEach((r) =>
      console.log("  -", formatPathWithSource(r, ROUTES_FILE)),
    );
    hasProblems = true;
  }

  if (duplicateMatchers.length) {
    console.log(chalk.red("Duplicate matchers in middleware config:\n"));
    duplicateMatchers.forEach((r) =>
      console.log("  -", formatPathWithSource(r, MIDDLEWARE_FILE)),
    );
    hasProblems = true;
  }

  if (duplicateRoleMappings.length) {
    console.log(chalk.red("Duplicate route keys in routeRoleAccessMap:\n"));
    duplicateRoleMappings.forEach((r) =>
      console.log("  -", formatPathWithSource(r, ROUTE_ROLES_FILE)),
    );
    hasProblems = true;
  }

  if (missingInMiddleware.length) {
    console.log(chalk.red("Missing matchers in middleware.ts:\n"));
    missingInMiddleware.forEach((r) =>
      console.log("  -", formatPathWithSource(r, ROUTES_FILE)),
    );
    hasProblems = true;

    console.log(chalk.cyan("The following matchers will be added:\n"));
    missingInMiddleware.forEach((m) => console.log(`  • ${m}`));

    const shouldFix = await askUserYesNo(
      "Would you like to auto-fix matchers now?",
    );
    if (shouldFix) {
      console.log(chalk.yellow("Running matcher sync script...\n"));
      execSync("npx tsx scripts/middleware/syncMatchers.ts", {
        stdio: "inherit",
      });
      console.log(chalk.green("Matchers fixed. Please re-run the check.\n"));
      process.exit(0);
    } else {
      console.log(chalk.gray(" Fix skipped by user."));
    }
  }

  if (extraInMiddleware.length) {
    console.log(chalk.yellow("Extra matchers not in protectedRoutes:\n"));
    extraInMiddleware.forEach((r) =>
      console.log("  -", formatPathWithSource(r, MIDDLEWARE_FILE)),
    );
    hasProblems = true;
  }

  if (missingInRouteRoles.length) {
    console.log(chalk.red("Missing role mappings in routeRoles.ts:\n"));
    missingInRouteRoles.forEach((r) => {
      console.log(`  - ${r}`);
      console.log(
        `    ↳ defined in: ${chalk.gray(ROUTES_FILE.replace(cwd, ""))}`,
      );
      console.log(
        `    ↳ missing in: ${chalk.red(ROUTE_ROLES_FILE.replace(cwd, ""))}`,
      );
    });
    hasProblems = true;
  }

  if (extraInRouteRoles.length) {
    console.log(chalk.yellow("Orphaned role mappings:\n"));
    extraInRouteRoles.forEach((r) =>
      console.log("  -", formatPathWithSource(r, ROUTE_ROLES_FILE)),
    );
    hasProblems = true;
  }

  if (!hasProblems) {
    console.log(
      chalk.green("\n All Routes, Matchers, and Roles are in sync.\n"),
    );
    process.exit(0);
  }

  process.exit(1);
}

validate();
