// One-time generator for public/og-image.png (social share card).
// Not part of the app build; run with: node scripts/generate-og-image.js
const sharp = require("sharp");
const fs = require("fs/promises");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#020617"/>
      <stop offset="0.6" stop-color="#0F172A"/>
      <stop offset="1" stop-color="#1E293B"/>
    </linearGradient>
    <linearGradient id="logo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3B82F6"/>
      <stop offset="0.5" stop-color="#60A5FA"/>
      <stop offset="1" stop-color="#2563EB"/>
    </linearGradient>
    <radialGradient id="glowTR" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#3B82F6" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#3B82F6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowBL" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#60A5FA" stop-opacity="0.25"/>
      <stop offset="1" stop-color="#60A5FA" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1100" cy="-40" r="300" fill="url(#glowTR)"/>
  <circle cx="60" cy="700" r="300" fill="url(#glowBL)"/>

  <rect x="530" y="120" width="140" height="140" rx="32" fill="url(#logo)"/>
  <text x="600" y="212" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="bold" fill="#ffffff" text-anchor="middle">AS</text>

  <text x="600" y="360" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="bold" fill="#F8FAFC" text-anchor="middle">Asadullah Sadiq</text>
  <text x="600" y="420" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#60A5FA" text-anchor="middle">Software Engineer &amp; Full Stack Developer</text>
  <text x="600" y="490" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#94A3B8" text-anchor="middle">asadullahsadiq.me</text>
</svg>`;

(async () => {
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  await fs.writeFile("public/og-image.png", png);
  console.log("public/og-image.png written:", png.length, "bytes");
})();
