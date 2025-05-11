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

function getProtectedRoutes(): string[] {
  const content = readFileOrExit(ROUTES_FILE, "Routes");

  const regexes = [
    /export\s+const\s+protectedRoutes\s*:\s*readonly\s*string\[\]\s*=\s*\[((?:.|\n)*?)\]/m,
    /export\s+const\s+protectedRoutes\s*=\s*\[((?:.|\n)*?)\]\s*as\s+const/m,
  ];

  for (const regex of regexes) {
    const match = regex.exec(content);
    if (match) {
      return match[1]
        .split(",")
        .map((s) => s.trim().replace(/^['"`]|['"`]$/g, ""))
        .filter(Boolean);
    }
  }

  throw new Error("Couldn't find protectedRoutes array");
}

function getMiddlewareMatchers(): string[] {
  const content = readFileOrExit(MIDDLEWARE_FILE, "Middleware");

  const match = /matcher:\s*\[((?:.|\n)*?)\]/m.exec(content);

  if (!match) return [];

  return match[1]
    .split(",")
    .map((s) => s.trim().replace(/^['"`]|['"`]$/g, ""))
    .filter(Boolean);
}

function getRouteRoleKeys(): string[] {
  const fileContent = readFileOrExit(ROUTE_ROLES_FILE, "routeRoles");

  const ROLE_MAP_REGEX =
    /export\s+const\s+routeRoleAccessMap\s*(?::[^=]+)?=\s*{([\s\S]*?)}\s*(?:as\s+const)?/m;
  const match = ROLE_MAP_REGEX.exec(fileContent);

  if (!match) {
    console.error(chalk.red("Failed to parse routeRoleAccessMap"));
    console.log(chalk.gray("First 300 chars of file:"));
    console.log(fileContent.slice(0, 300));
    process.exit(1);
  }

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
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      chalk.yellowBright.bold(
        `\n  ${question}\nPress ${chalk.green("Y")} to confirm or ${chalk.gray("N")} to skip: `,
      ),
      (answer) => {
        rl.close();
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

  const duplicateProtectedRoutes = findDuplicates(protectedRoutes);
  const duplicateMatchers = findDuplicates(matchers);
  const duplicateRoleMappings = findDuplicates(routeRoles);

  let hasProblems = false;

  if (duplicateProtectedRoutes.length) {
    console.log(chalk.red("\n Duplicate entries in protectedRoutes:"));
    duplicateProtectedRoutes.forEach((r) =>
      console.log("  -", formatPathWithSource(r, ROUTES_FILE)),
    );
    hasProblems = true;
  }

  if (duplicateMatchers.length) {
    console.log(chalk.red("\n Duplicate matchers in middleware config:"));
    duplicateMatchers.forEach((r) =>
      console.log("  -", formatPathWithSource(r, MIDDLEWARE_FILE)),
    );
    hasProblems = true;
  }

  if (duplicateRoleMappings.length) {
    console.log(chalk.red("\n Duplicate route keys in routeRoleAccessMap:"));
    duplicateRoleMappings.forEach((r) =>
      console.log("  -", formatPathWithSource(r, ROUTE_ROLES_FILE)),
    );
    hasProblems = true;
  }

  if (missingInMiddleware.length) {
    console.log(chalk.red("\n Missing matchers in middleware.ts:"));
    missingInMiddleware.forEach((r) =>
      console.log("  -", formatPathWithSource(r, ROUTES_FILE)),
    );
    hasProblems = true;

    console.log(chalk.cyan("\n The following matchers will be added:"));
    missingInMiddleware.forEach((m) => console.log(`  • ${m}`));

    const shouldFix = await askUserYesNo(
      "Would you like to auto-fix matchers now?",
    );
    if (shouldFix) {
      console.log(chalk.yellow("\n Running matcher sync script..."));
      execSync("npx tsx scripts/middleware/syncMatchers.ts", {
        stdio: "inherit",
      });
      console.log(chalk.green("\n Matchers fixed. Please re-run the check.\n"));
      process.exit(0);
    } else {
      console.log(chalk.gray(" Fix skipped by user."));
    }
  }

  if (extraInMiddleware.length) {
    console.log(chalk.yellow("\n Extra matchers not in protectedRoutes:"));
    extraInMiddleware.forEach((r) =>
      console.log("  -", formatPathWithSource(r, MIDDLEWARE_FILE)),
    );
    hasProblems = true;
  }

  if (missingInRouteRoles.length) {
    console.log(chalk.red("\n Missing role mappings in routeRoles.ts:"));
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
    console.log(chalk.yellow("\n Orphaned role mappings:"));
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
