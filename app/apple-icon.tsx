import { ImageResponse } from "next/og";
import { loadFrauncesOgFont } from "@/lib/og-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const fraunces = await loadFrauncesOgFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1C2620",
          borderRadius: "50%",
          color: "#F4F1EA",
          fontSize: 96,
          fontFamily: "Fraunces",
          fontWeight: 500,
        }}
      >
        C
      </div>
    ),
    { ...size, fonts: [fraunces] },
  );
}
