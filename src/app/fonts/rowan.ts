import localFont from "next/font/local";

export const rowan = localFont({
  src: [
    {
      path: "./Rowan-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Rowan-Regular-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
});
