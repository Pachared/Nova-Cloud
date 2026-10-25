import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/shared/seo/site";

export const alt = "Nova Cloud — Build, Test and Deploy from GitHub";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public", "Nova.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background: "linear-gradient(135deg, #050407 0%, #211043 65%, #5227ff 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px 80px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={logoSrc} width={88} height={86} alt="" />
          <div style={{ fontSize: 72, fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3 }}>
            Build. Test. Deploy.
          </div>
          <div style={{ color: "#d8b4fe", fontSize: 34 }}>
            Your code. One cloud.
          </div>
        </div>
        <div style={{ color: "#c4b5fd", fontSize: 26 }}>{site.hostname}</div>
      </div>
    ),
    size
  );
}
