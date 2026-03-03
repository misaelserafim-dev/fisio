import "@/scss/main.scss";
import { Metadata } from "next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import QueryProvider from "@/provider/QueryProvider/QueryProvider";
import Footer from "@/components/Footer/Footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Fisio - Clínica de Fisioterapia",
  description: "",
  metadataBase: new URL("https://www.fisio.com.br"),
  openGraph: {
    title: "Fisio - Clínica de Fisioterapia",
    description: "Clínica de Fisioterapia em Natal, RN.",
    url: "https://www.fisio.com.br",
    images: [{ url: "/icon.png", width: 582, height: 158, alt: "Fisio" }],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", type: "image/x-icon" },
      { url: "/favicon/favicon-32x32.png", type: "image/png" },
      { url: "/favicon/apple-touch-icon.png", rel: "apple-touch-icon" },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GOOGLE_GTM || "GTM-WHQLMCSH";
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "";

  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
        {/* <GoogleTagManager gtmId={gtmId} />
        <GoogleAnalytics gaId={gaId} /> */}
      </body>
    </html>
  );
}