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

## Running the Development Server

To start the development server, run:

```bash
npm run dev
```

---

This version improves readability, adds structure, and ensures users follow the right steps. Let me know if you need any adjustments! 🚀
