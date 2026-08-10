import { ImageResponse } from "next/og";
import { loadFrauncesOgFont } from "@/lib/og-font";

export const alt = "Cerne Curadoria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const fraunces = await loadFrauncesOgFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1C2620",
          color: "#F4F1EA",
          fontFamily: "Fraunces",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            letterSpacing: "0.06em",
            fontWeight: 500,
          }}
        >
          CERNE
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 12,
            fontSize: 28,
            color: "#B08D4F",
            letterSpacing: "0.04em",
            fontWeight: 400,
          }}
        >
          Curadoria
        </div>
      </div>
    ),
    { ...size, fonts: [fraunces] },
  );
}
