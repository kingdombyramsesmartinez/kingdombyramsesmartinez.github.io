import fs from "node:fs";

const b64White = fs.readFileSync("assets/brand/kingdom-logo-white.png").toString("base64");
const b64Black = fs.readFileSync("assets/brand/kingdom-logo-black.png").toString("base64");

const svgWhite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 691">
  <image width="1024" height="691" href="data:image/png;base64,${b64White}"/>
</svg>`;

const svgAdaptiveFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 691">
  <style>
    @media (prefers-color-scheme: light) {
      .logo-white { display: none; }
      .logo-black { display: block; }
    }
    @media (prefers-color-scheme: dark) {
      .logo-white { display: block; }
      .logo-black { display: none; }
    }
  </style>
  <image class="logo-white" width="1024" height="691" href="data:image/png;base64,${b64White}"/>
  <image class="logo-black" width="1024" height="691" href="data:image/png;base64,${b64Black}" style="display:none;"/>
</svg>`;

fs.writeFileSync("assets/brand/logo.svg", svgWhite);
fs.writeFileSync("assets/brand/favicon.svg", svgAdaptiveFavicon);
console.log("Logos y favicons generados correctamente.");
