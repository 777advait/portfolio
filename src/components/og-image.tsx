import { ImageResponse } from "@vercel/og";
import fs from "fs/promises";
import path from "path";

export const config = {
  runtime: "edge",
};

// Load fonts
const geistFont = fs.readFile(
  path.resolve("./public/fonts/Geist-Regular.woff")
);
const naoriFont = fs.readFile(path.resolve("./public/fonts/naori.otf"));
const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
  timeZone: "Asia/Kolkata",
});

export default async function OGImage() {
  const geistFontData = await geistFont;
  const naoriFontData = await naoriFont;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "4rem", // Reduced padding
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Adjusted layout for better spacing
          backgroundColor: "hsl(40 30% 96%)",
          textTransform: "lowercase",
        }}
      >
        <div
          style={{
            fontSize: 108, // Reduced from 64 to better fit in the image
            fontWeight: "bold",
            color: "#2b4162",
            marginBottom: 16, // Slightly reduced margin
            fontFamily: "Naori",
            wordBreak: "break-word", // Ensure long titles break into multiple lines
            padding: "0 10px",
          }}
        >
          astro
        </div>
        <div
          style={{
            fontSize: 22, // Reduced font size for better readability
            color: "#4d648d",
            maxWidth: "90%", // Ensure text doesn't span too wide
            marginBottom: 24, // Adjusted margin
            fontFamily: "Geist",
            lineHeight: "1.4", // Added line height for better readability
            padding: "0 10px",
          }}
        >
          full-stack engineer interested in building scalable and performant web
          applications.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between", // Adjusted layout for better spacing
            alignItems: "center",
            marginTop: "auto", // Pushes the footer information to the bottom
            fontSize: 20, // Reduced font size for the date and location
            fontFamily: "Geist",
            borderTop: "1px solid hsl(210 30% 80%)",
            padding: "0 10px",
            paddingTop: "20px",
            color: "hsl(210 30% 45%)",
          }}
        >
          <div style={{ color: "#4d648d" }}>19.0760° N, 72.8777° E</div>
        </div>
      </div>
    ),
    {
      width: 1004, // Fixed width
      height: 591, // Fixed height
      fonts: [
        {
          name: "Geist",
          data: geistFontData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Naori",
          data: naoriFontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
