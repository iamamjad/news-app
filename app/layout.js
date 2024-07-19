"use client";
import Links from "./links/page";
import Header from "./header/page";
import Footer from "./footer/page";
import { AuthProvider } from "../context/AuthContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {" "}
          {/* Wrap application in AuthProvider */}
          <Links />
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
