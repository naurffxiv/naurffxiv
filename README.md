# Setting Up and Running the Project

This repository powers [naurffxiv.com](https://naurffxiv.com/).

## Prerequisites

You need **Node.js** and **npm** to run the development server.

### Check Installed Versions

Run the following commands to verify your installation:

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

If Node.js and npm are not installed or their versions are lower than the ones above, follow the installation steps below.

---

## Installation

### Install or Upgrade npm

If you need to install or update **npm**, run:

```bash
npm install -g npm
```

### Install Node.js Using nvm

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

---

### Install all necessary libraries

If you don't have all the necessary libraries used in this project, run:

```bash
npm install
```

## Running the Development Server

To start the development server, run:

```bash
npm run dev
```

---

To build and test what the website will be like in production, run:

```bash
npm run build
npm run start
```

# Formatting and Linting

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

# Contributing

If you would to contribute, please take a look over at our [Wiki](https://github.com/naurffxiv/naurffxiv/wiki) on certain processes.
