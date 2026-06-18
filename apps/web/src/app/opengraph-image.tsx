import { ImageResponse } from "next/og";

export const alt = "Nova deployment platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div style={{ fontSize: 104, fontWeight: 800 }}>Nova</div>
        <div style={{ color: "#b9b9b9", fontSize: 36, marginTop: 24 }}>
          Deployment platform for modern teams
        </div>
      </div>
    ),
    size
  );
}
