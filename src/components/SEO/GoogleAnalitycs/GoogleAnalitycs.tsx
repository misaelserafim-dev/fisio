import { FC } from "react";
import Script from "next/script";

const GoogleAnalitycs: FC = () => {
  return (
    <>
      <Script
        id="google-analitycs"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""}`}
      />
      <Script strategy="lazyOnload" id="google-analitycs-UA">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
    </>
  );
};

export default GoogleAnalitycs;
