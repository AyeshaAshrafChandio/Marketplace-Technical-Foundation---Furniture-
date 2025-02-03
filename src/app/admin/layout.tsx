import type { Metadata } from "next";
import "./global2.css"

export const metadata: Metadata = {
  title: " ",
  description: " ",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
