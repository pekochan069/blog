import { generateManifest } from "material-icon-theme";

export const mi = generateManifest({
  activeIconPack: "react",
  files: {
    associations: {},
  },
  folders: {
    associations: {},
    theme: "specific",
  },
  hidesExplorerArrows: true,
  languages: {},
});

export const defaultFile = "/icons/default-file.svg";
export const defaultFolder = "/icons/default-folder.svg";
export const defaultFolderOpen = "/icons/default-folder-open.svg";
