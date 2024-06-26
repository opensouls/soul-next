import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "OPEN SOULS",
  description: "OS v0.1.0 - in progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme
          accentColor="iris"
          appearance="dark"
          panelBackground="translucent"
          radius="small"
          scaling="100%"
        >
          {children}
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
