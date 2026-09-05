// One-time generator for static OG/share images (not part of the app build).
// Run with: node scripts/generate-og-image.js
const sharp = require("sharp");
const fs = require("fs/promises");

const SVG_BASE = (title, subtitle, footer, label) => {
  const esc = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  // Wrap long titles onto up to 2 lines of ~34 chars.
  const words = String(title).split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > 34 && line) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  const titleLines = lines.slice(0, 2).join(" ");
  const titleSize = titleLines.length > 34 ? 52 : 60;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
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
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1100" cy="-40" r="300" fill="url(#glowTR)"/>

  <rect x="80" y="80" width="96" height="96" rx="22" fill="url(#logo)"/>
  <text x="128" y="146" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="bold" fill="#ffffff" text-anchor="middle">AS</text>

  ${label ? `<text x="200" y="136" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#60A5FA">${esc(label)}</text>` : ""}

  <text x="80" y="320" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}" font-weight="bold" fill="#F8FAFC">${esc(titleLines)}</text>
  ${subtitle ? `<text x="80" y="392" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#94A3B8">${esc(String(subtitle).slice(0, 64))}</text>` : ""}
  <text x="80" y="540" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#94A3B8">${esc(footer)}</text>
</svg>`;
};

(async () => {
  await fs.mkdir("public/og/projects", { recursive: true });
  await fs.mkdir("public/og/blog", { recursive: true });

  // 1. Site-wide OG image
  const siteSvg = SVG_BASE(
    "Asadullah Sadiq",
    "Software Engineer & Full Stack Developer",
    "📍 Sahiwal, Pakistan  ·  asadullahsadiq.me",
    ""
  );
  await fs.writeFile("public/og-image.png", await sharp(Buffer.from(siteSvg)).png().toBuffer());
  console.log("public/og-image.png written");

  // 2. Per-project OG images
  const projects = JSON.parse(await fs.readFile("src/data/projects.json", "utf8"));
  for (const p of projects) {
    if (!p.id) continue;
    const svg = SVG_BASE(
      p.title,
      p.technologies ? p.technologies.join(" · ") : "",
      `asadullahsadiq.me/projects/${p.id}  ·  Asadullah Sadiq`,
      "PROJECT"
    );
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    await fs.writeFile(`public/og/projects/${p.id}.png`, png);
    console.log(`public/og/projects/${p.id}.png written (${p.title})`);
  }

  // 3. Blog listing OG image
  const blogSvg = SVG_BASE(
    "Blog — Articles & Tutorials",
    "Full-stack development articles by Asadullah Sadiq",
    "asadullahsadiq.me/blog",
    "BLOG"
  );
  await fs.writeFile("public/og/blog-listing.png", await sharp(Buffer.from(blogSvg)).png().toBuffer());
  console.log("public/og/blog-listing.png written");

  // 4. Manifest icons (AS logo, square)
  const icon512Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="logo" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#3B82F6"/>
        <stop offset="0.5" stop-color="#60A5FA"/>
        <stop offset="1" stop-color="#2563EB"/>
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="112" fill="#020617"/>
    <rect x="16" y="16" width="480" height="480" rx="96" fill="url(#logo)" opacity="0.95"/>
    <text x="256" y="336" font-family="Arial, Helvetica, sans-serif" font-size="224" font-weight="bold" fill="#ffffff" text-anchor="middle">AS</text>
  </svg>`;
  await fs.writeFile("public/icon-512.png", await sharp(Buffer.from(icon512Svg)).png().toBuffer());
  const icon192 = await sharp(Buffer.from(icon512Svg)).resize(192, 192).png().toBuffer();
  await fs.writeFile("public/icon-192.png", icon192);
  console.log("public/icon-512.png + icon-192.png written");
})();
