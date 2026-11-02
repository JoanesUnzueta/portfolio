/**
 * Build the responsive slide set from the 3840×1920 PNG masters in src/assets.
 * Outputs are written to public/slides and copied into dist by Vite.
 * Widths must stay in sync with src/App.tsx.
 */
import { createHash } from "node:crypto";
import { readdir, readFile, rm, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "src/assets");
const outDir = path.join(root, "public/slides");
const stampPath = path.join(root, ".cache/optimize-slides");

export const SLIDE_WIDTHS = [1280, 1920, 2560];

const webpOptions = { quality: 82, effort: 4, smartSubsample: true };
const avifOptions = { quality: 55, effort: 4, chromaSubsampling: "4:4:4" };

const settingsStamp = createHash("sha256")
  .update(JSON.stringify({ widths: SLIDE_WIDTHS, webpOptions, avifOptions }))
  .digest("hex");

async function isFresh(filePath, srcMtimeMs) {
  try {
    const info = await stat(filePath);
    return info.size > 0 && info.mtimeMs >= srcMtimeMs;
  } catch {
    return false;
  }
}

async function mapPool(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => run()));
  return results;
}

async function encodeSlide(file) {
  const id = path.basename(file, ".png");
  const input = path.join(srcDir, file);
  const srcStat = await stat(input);
  let wrote = 0;

  for (const width of SLIDE_WIDTHS) {
    const webpPath = path.join(outDir, `${id}-${width}.webp`);
    const avifPath = path.join(outDir, `${id}-${width}.avif`);
    const needWebp = !(await isFresh(webpPath, srcStat.mtimeMs));
    const needAvif = !(await isFresh(avifPath, srcStat.mtimeMs));
    if (!needWebp && !needAvif) continue;

    const resized = await sharp(input)
      .resize({ width, withoutEnlargement: true, kernel: "lanczos3" })
      .toBuffer();

    if (needWebp) {
      await sharp(resized).webp(webpOptions).toFile(webpPath);
      wrote += 1;
    }
    if (needAvif) {
      await sharp(resized).avif(avifOptions).toFile(avifPath);
      wrote += 1;
    }
  }

  return { id, wrote };
}

export async function optimizeSlides() {
  await mkdir(outDir, { recursive: true });
  await mkdir(path.dirname(stampPath), { recursive: true });

  let stamp = "";
  try {
    stamp = await readFile(stampPath, "utf8");
  } catch {
    stamp = "";
  }
  if (stamp !== settingsStamp) {
    const existing = await readdir(outDir);
    await Promise.all(
      existing
        .filter((name) => name.endsWith(".webp") || name.endsWith(".avif"))
        .map((name) => rm(path.join(outDir, name))),
    );
  }

  const files = (await readdir(srcDir)).filter((name) => /^P_\d+\.png$/.test(name)).sort();
  const expected = Array.from(
    { length: 15 },
    (_, index) => `P_${String(index + 1).padStart(2, "0")}.png`,
  );
  const missing = expected.filter((name) => !files.includes(name));
  if (missing.length > 0) {
    throw new Error(`Missing slide masters: ${missing.join(", ")}`);
  }

  const started = Date.now();
  const results = await mapPool(expected, 3, encodeSlide);
  await writeFile(stampPath, settingsStamp);

  const outputs = (await readdir(outDir)).filter(
    (name) => name.endsWith(".webp") || name.endsWith(".avif"),
  );
  let webpBytes = 0;
  let avifBytes = 0;
  const byWidth = {};
  for (const name of outputs) {
    const info = await stat(path.join(outDir, name));
    const width = name.match(/-(\d+)\.(webp|avif)$/);
    if (!width) continue;
    const key = `${width[2]}-${width[1]}`;
    byWidth[key] = (byWidth[key] ?? 0) + info.size;
    if (name.endsWith(".webp")) webpBytes += info.size;
    else avifBytes += info.size;
  }

  const encoded = results.reduce((sum, result) => sum + result.wrote, 0);
  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  console.log(
    `optimize-slides: ${encoded} file(s) encoded, ${outputs.length} variants in public/slides (${seconds}s)`,
  );
  for (const key of Object.keys(byWidth).sort()) {
    console.log(`  ${key}: ${(byWidth[key] / 1024).toFixed(0)} KiB`);
  }
  console.log(
    `  webp total ${(webpBytes / 1024 / 1024).toFixed(2)} MiB, avif total ${(avifBytes / 1024 / 1024).toFixed(2)} MiB`,
  );
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  optimizeSlides().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
