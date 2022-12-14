import { Navbar } from "@modules/Navbar/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="flex h-screen w-screen flex-col-reverse md:flex-row overflow-y-hidden">
          <Navbar />
          <div className="w-full">
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
