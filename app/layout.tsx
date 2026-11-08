import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { Cursor } from "./components/Cursor";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Raj Yadav | Full-Stack Developer",
  description: "Raj Yadav is a Computer Science Engineering student building full-stack applications, backend services, mobile apps, and AI-powered tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <Cursor
            name="User"
            cursorColor="pink"
            customSVG=""
            svgClassName=""
          >
            {children}
          </Cursor>
        </ThemeProvider>
      </body>
    </html>
  );
}
