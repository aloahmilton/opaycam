import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SecurityProvider } from "@/contexts/SecurityContext";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "OpayCam - Mobile Finance for Cameroon",
  description: "Send money, pay bills, and manage your finances with OpayCam",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SecurityProvider>
            <LanguageProvider>
              <Header />
              <main>{children}</main>
            </LanguageProvider>
          </SecurityProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
