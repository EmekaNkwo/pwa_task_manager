import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import StyledComponentsRegistry from "@/lib/AntdDesignRegistry";

const karla = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: " PWA Task Manager",
  description: "PWA Task Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <ReduxProvider>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
