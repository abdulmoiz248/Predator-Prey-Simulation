import type { Metadata } from "next";

import "./globals.css";
import FloatingAvatar from "@/components/floating-avatar";



export const metadata: Metadata = {
  title: "Predator Prey Simulation",
  description: "Parallel computing Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      
      >  
        {children}
        <FloatingAvatar/>
      </body>
    </html>
  );
}
