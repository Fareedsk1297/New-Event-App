import type { Metadata as NextMetadata } from "next";
import { Poppins as GooglePoppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

// Ensure that font loader values are explicitly written literals
const poppins = GooglePoppins({
  subsets: ["latin"] as const,
  weight: ["400", "500", "600", "700"] as const,
  variable: "--font-poppins" as const,
});

interface Icon {
  icon: string;
}

export interface AppMetadata extends NextMetadata {
  icons: Icon;
}

export const metadata: AppMetadata = {
  title: "Evently",
  description: "Evently is a platform for event management.",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.variable}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
