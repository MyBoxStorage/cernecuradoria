import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Fraunces estático (wght 500) para ImageResponse — Satori não lê woff2 variável. */
export async function loadFrauncesOgFont() {
  const data = await readFile(
    join(process.cwd(), "assets/fonts/Fraunces-OG.ttf"),
  );

  return {
    name: "Fraunces",
    data,
    style: "normal" as const,
    weight: 500 as const,
  };
}
