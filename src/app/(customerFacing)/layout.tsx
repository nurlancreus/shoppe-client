import type { Metadata } from "next";
import { Allerta_Stencil, DM_Sans } from "next/font/google"; // Import from next/font/google
import "../globals.css";
import Header from "../_components/layout/header";
import Footer from "../_components/layout/footer";
import { getSession } from "@/lib/helpers/server-helpers";

// Google fonts
const allertaStencil = Allerta_Stencil({
  weight: "400", // Allerta Stencil comes only in 400 weight
  subsets: ["latin"], // Specify subsets you want
  variable: "--font-allerta-stencil", // Custom CSS variable
});

const dmSans = DM_Sans({
  weight: ["400", "500", "700"], // Available weights
  subsets: ["latin"], // Specify subsets you want
  variable: "--font-dm-sans", // Custom CSS variable
});

export const metadata: Metadata = {
  title: "Shoppe",
  description: "Shoppe - Your Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  console.log("SESSION", getSession())
  return (
    <html lang="en">
      <body
        className={`${allertaStencil.variable} ${dmSans.variable} grid min-h-screen grid-rows-[auto,1fr,auto] antialiased`}
      >
        {/* umumu suspense sal */}
        <Header />
        <main>
          <div className="container">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
