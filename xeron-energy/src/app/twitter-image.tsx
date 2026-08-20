import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Social / search preview card, generated at build time.
 *
 * The old schema pointed at /og.png, which was never added to the repo — every
 * WhatsApp forward and Google preview of this site fetched a 404. Generating it
 * here means the image can never drift out of sync with the site copy.
 */
export const alt = `${site.name} — Solar EPC in Rajkot, Gujarat`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #050506 0%, #0b1020 55%, #10233d 100%)",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#ffb020",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#8fa3bf",
            }}
          >
            Solar EPC · Rajkot, Gujarat
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 82, fontWeight: 700, color: "#f4f7fb", lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 44, color: "#ffb020", lineHeight: 1.15 }}>
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 28,
            fontSize: 28,
            color: "#8fa3bf",
          }}
        >
          <div style={{ display: "flex" }}>
            Turnkey residential · commercial · industrial solar
          </div>
          <div style={{ display: "flex", color: "#f4f7fb" }}>{site.phone}</div>
        </div>
      </div>
    ),
    size
  );
}
