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

export const defaultFileSvg = `<path
    d='M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m5 2H6v16h12v-9h-7V4z'
    fill='#90a4ae' />`;
export const folderSvg = `<path
    d="M13.84376,7.53645l-1.28749-1.0729A2,2,0,0,0,11.27591,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2H15.12412A2,2,0,0,1,13.84376,7.53645Z"
    fill="#90a4ae" />`;
export const folderOpenSvg = `<path
    d='M28.96692,12H9.44152a2,2,0,0,0-1.89737,1.36754L4,24V10H28a2,2,0,0,0-2-2H15.1241a2,2,0,0,1-1.28038-.46357L12.5563,6.46357A2,2,0,0,0,11.27592,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H26l4.80523-11.21213A2,2,0,0,0,28.96692,12Z'
    fill='#90a4ae' />`;
