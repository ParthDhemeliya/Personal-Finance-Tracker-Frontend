import { Inter } from "next/font/google";
import { Providers } from "../redux/provider";
import "./globals.css";
import UserBootstrap from "../common/UserBootstrap";
import { Toaster } from "react-hot-toast";
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
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#363636",
                color: "#fff",
                zIndex: 9999,
              },
              success: {
                duration: 3000,
                style: {
                  background: "#10B981",
                  zIndex: 9999,
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: "#EF4444",
                  zIndex: 9999,
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
