import { ImageResponse } from "next/og";
import { loadFrauncesOgFont } from "@/lib/og-font";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          fontSize: 18,
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
