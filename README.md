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
run: npx eslint . --ext .js,.jsx,.ts,.tsx
```

# Contributing

## Images on this website

Most images on the site should be compressed. I recommend including the original somewhere though so if/when we need to do something
with it we don't modify a compressed version. If the image is a styling image (logos, background images, etc), the image should be
compressed to what the maximum size will be. All content pages SHOULD have a width limit, so past a certain resolution they won't
increase anymore. We're aiming for that resolution.

For strat images in MDX content, the users probably will want to have the original uncompressed to open in another tab and/or share with others.
Since we still need to keep our bandwidth in check, we serve the compressed version on the strat page. Once a user clicks on the image,
it loads the uncompressed version of the image in a modal. This is done with `@/components/Mdx/ImageModal.js`.

You can embed the original .png file as normal: `![alt text](url/to/image.png)` and it should automatically be set up to use the component.
The compressed files must be present with the same file name except for an extension of `.avif`.
For example, if the original src is `looper.png`, the compressed image should be named `looper.avif` and be located in the same folder as the original.
The markdown to embed this image is still the same, `![alt text](/images/ultimate/top/looper.png)`, since all `<img>` tags translated to `<ImageModal>` tags.
I've been using https://squoosh.app/ to compress to .avif, just eyeball it and see whether it looks good enough when resizing + compressing while keeping filesize small.
If you want to compress to another file extension in MDX pages, you can just use the component directly `<ImageModal>` and set `compressedExt` to the etension of your choosing

TL;DR

- Most images used on site should have their original **_and_** compressed variants, same folder as original
  - For MDX files, we store the original so users can access them
  - For styling, not required but nice to have original in case we need to modify it
- Use https://squoosh.app/ to compress
  - Try to compress to `.avif`
  - Quality anywhere around 50-75 is fine
  - Resize image to maximum image size (Images for MDX pages are about 761px, an even 800px width is fine)
    - Remember to keep aspect ratio

There's probably a much better way to handle this. Feel free to suggest a better way to handle images
