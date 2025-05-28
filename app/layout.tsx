import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
export const metadata: Metadata = {
  title: "MyStore",
  description: "Buy cool products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col bg-white">
        <Navbar />
        <main className="flex-grow w-full px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}