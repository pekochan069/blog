import { exists } from "node:fs/promises";

function getTime() {
  // const today = new Date();
  // const year = today.getFullYear();
  // const month = String(today.getMonth() + 1).padStart(2, "0");
  // const day = String(today.getDate()).padStart(2, "0");

  // return `${year}-${month}-${day}`;
  return new Date().toISOString();
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error("Usage: create-post <post-name>");
    process.exit(1);
  }

  let postName = args[0];
  if (!postName.endsWith(".mdoc")) {
    postName += ".mdoc";
  }

  const postDir = "./src/data/posts";
  const fileName = `${postDir}/${postName}`;

  if (await exists(fileName)) {
    console.error(`File ${fileName} already exists`);
    process.exit(1);
  }

  const text = `---
title: ${postName.replace(/\.mdx$/, "")}
description: ''
category: ''
tags: []
published: ${getTime()}
draft: false
---`;

  await Bun.write(fileName, text);
  console.log(`Created ${fileName}`);
}

main();
