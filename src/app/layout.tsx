import { Inter } from "next/font/google";
import { Providers } from "../redux/provider";
import "./globals.css";
import UserBootstrap from "../common/UserBootstrap";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <UserBootstrap />
          {children}
        </Providers>
      </body>
    </html>
  );
}
