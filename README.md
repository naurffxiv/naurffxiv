This repository is the home of [naurffxiv.com](https://naurffxiv.com/).

## Getting Started

### Installation
You will need npm to run the development server.

Check your version of Node.js and npm.
```bash
node -v
npm -v
```

You should get something like the below. If there is no version, then you need to install Node.js and npm. If your version is lower than the ones below, follow the [Upgrading npm](#upgrade-npm) section.
```bash
❯ node -v
v22.6.0

❯ npm -v
10.8.2
```

To install, use the following command.
```bash
npm install -g npm
```

Install [Material UI](https://mui.com/)
```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```
If the command fails, add `--force` to the end of the command.

Install React Router
```bash
npm install react-router-dom
```

Install React Slick
```bash
npm install react-slick --save
```

### <a name="upgrade-npm"></a>Upgrading npm

Install the new package with curl.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
```

Restart ubuntu and run the following commands.
```bash
nvm install 22
npm install next
```

### Running the development server
Run the following command to start your dev environment.

```bash
make start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
