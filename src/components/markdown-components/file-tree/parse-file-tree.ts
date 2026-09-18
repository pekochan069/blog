export function parseFileTree(source: string) {
  const parts = source
    .split("\n")
    .filter((part) => part !== "")
    .map((part) => {
      let start = part.length;

      // oxlint-disable-next-line no-plusplus
      for (let i = 0; i < part.length; ++i) {
        // oxlint-disable-next-line typescript/no-non-null-assertion
        const c = part[i]!;
        if (c !== " ") {
          start = i;
          break;
        }
      }

      return {
        level: start === part.length ? 0 : start / 2,
        part,
      };
    })
    .map(({ level, part }) => {
      const split = part.split("- ");
      let name = split.length > 1 ? split[1] : undefined;
      let highlight = false;
      let isDir = false;

      if (!name) {
        throw new Error("Invalid File Tree syntax");
      }

      if (name.slice(0, 2) === "**" && name.slice(-2) === "**") {
        highlight = true;
        name = name.slice(2, -2);
      }

      if (name.at(-1) === "/") {
        isDir = true;
        name = name.slice(0, -1);
      }

      return {
        highlight,
        isDir,
        level,
        name,
      };
    });

  const currentDir: string[] = [];

  for (const part of parts) {
    currentDir.length = part.level;

    if (part.isDir) {
      currentDir.push(part.name);
      part.name = `${currentDir.join("/")}/`;
    } else {
      part.name = [...currentDir, part.name].join("/");
    }
  }

  return parts;
}
