import chalk from "chalk";
import fs from "fs";
import path from "path";

const ROUTES_FILE = path.resolve("src/auth/middleware/routes.config.ts");
const MIDDLEWARE_FILE = path.resolve("src/middleware.ts");

function extractRoutes(): string[] {
  const content = fs.readFileSync(ROUTES_FILE, "utf8");

  const regexes = [
    /export\s+const\s+protectedRoutes\s*:\s*readonly\s*string\[\]\s*=\s*\[((?:.|\n)*?)\]/m,
    /export\s+const\s+protectedRoutes\s*=\s*\[((?:.|\n)*?)\]\s*as\s+const/m,
  ];

  let match: RegExpExecArray | null = null;
  for (const regex of regexes) {
    match = regex.exec(content);
    if (match) break;
  }

  if (!match) {
    console.error("Could not parse protectedRoutes array.");
    console.log("First 300 char of content:\n", content.slice(0, 300));
    throw new Error("Could not parse protectedRoutes array");
  }

  return match[1]
    .split(",")
    .map((s) => s.trim().replace(/^['"`]|['"`]$/g, ""))
    .filter(Boolean);
}

function generateUpdatedMatchers(
  existing: string[],
  fromRoutes: string[],
): string[] {
  const seen = new Set(existing);
  for (const route of fromRoutes.map((r) => `${r}/:path*`)) {
    if (!seen.has(route)) {
      existing.push(route);
      seen.add(route);
    }
  }
  return existing;
}

function syncMatchers(): void {
  const routes = extractRoutes();

  const middlewareContent = fs.readFileSync(MIDDLEWARE_FILE, "utf8");
  const matcherRegex = /matcher:\s*\[((?:.|\n)*?)\]/m;
  const match = matcherRegex.exec(middlewareContent);

  if (!match) {
    console.error("Could not find matcher array in middleware.ts");
    process.exit(1);
  }

  const existingMatchers = match[1]
    .split(",")
    .map((s) => s.trim().replace(/^['"`]|['"`]$/g, ""))
    .filter(Boolean);

  const combinedMatchers = generateUpdatedMatchers(
    existingMatchers,
    routes, //raw route strings
  );

  const newBlock = `matcher: [\n${combinedMatchers
    .map((r) => `    "${r}",`)
    .join("\n")}\n  ]`;

  const updatedMiddleware = middlewareContent.replace(matcherRegex, newBlock);

  fs.writeFileSync(MIDDLEWARE_FILE, updatedMiddleware, "utf8");
  console.log(
    chalk.green(" Matchers appended into middleware.ts without duplicates."),
  );
}

syncMatchers();
