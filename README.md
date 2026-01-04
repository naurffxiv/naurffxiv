# Setting Up and Running the Project

This repository powers [naurffxiv.com](https://naurffxiv.com/).

## Getting Started

You can run this project using either **Docker** (recommended for consistency) or a **local Node.js setup**.

Both approaches will serve the application at `http://localhost:3000`

---

## Option A: Docker Setup (Recommended)

Docker provides a consistent development environment across all machines.

### Prerequisites

You need **Docker** and **Docker Compose** installed.

#### Check Installed Versions

```bash
docker --version
docker compose version
```

#### Installation

If you don't have Docker installed:

- **Linux**: Follow the [official Docker installation guide](https://docs.docker.com/engine/install/)
- **macOS/Windows**: Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Running with Docker

#### Development Mode (with hot-reloading)

```bash
docker compose --profile dev up
```

Changes to code will automatically reload.

#### Production Preview

To test the production build locally:

```bash
docker compose --profile prod up -d
```

#### Rebuilding After Changes

If you add new packages (modify `package.json`) or want to ensure a fresh build, append `--build` to your command:

```bash
# For Development
docker compose --profile dev up --build

# For Production
docker compose --profile prod up --build
```

---

## Option B: Local Node.js Setup

If you prefer to run the project directly on your machine without Docker.

### Prerequisites

You need **Node.js v22+** and **npm v10+**.

#### Check Installed Versions

```bash
node -v
npm -v
```

Expected output:

```bash
❯ node -v
v22.6.0

❯ npm -v
10.8.2
```

### Installation

### Install or Upgrade npm

If you need to install or update **npm**, run:

```bash
npm install -g npm
```

#### Install Node.js Using nvm

If you need to install or update **Node.js**, use [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm):

1. Install nvm:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
   ```

2. Restart your terminal or run:

   ```bash
   source ~/.bashrc
   ```

3. Install the required Node.js version:

   ```bash
   nvm install 22
   ```

4. Install Next.js:

   ```bash
   npm install next
   ```

#### Install Project Dependencies

```bash
npm install
```

### Running Locally

#### Development Server

```bash
npm run dev
```

#### Production Build

To build and test what the website will be like in production, run:

```bash
npm run build
npm run start
```

---

## Formatting and Linting

To merge into the repository, the code must pass the pipelines. Here are some commands to run the linter and formatter

## Prettier Formatting

```bash
# Installation
npm install --save-dev prettier

# Running the check
npx prettier --check .

# Automatically fix formatting issues
npx prettier --write .
```

## ESLint

```bash
# Installation
npm install --save-dev eslint

# Run the linter
npx eslint . --ext .js,.jsx,.ts,.tsx
```

## Contributing

If you would like to contribute, please take a look over at our [Wiki](https://github.com/naurffxiv/naurffxiv/wiki) on certain processes.
