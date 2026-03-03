import "./WhatsApp.scss";
import { FC, ComponentProps } from "react";
import { Locale } from "@/locales/locales";
import { whatsAppTranslations } from "./translations";

import ImgDefault from "../ImgDefault/ImgDefault";
import Link from "next/link";

type WhatsAppProps = {
  data: any;
  locale: Locale;
} & ComponentProps<"div">;

const WhatsApp: FC<WhatsAppProps> = ({ data, locale = "pt" }) => {
  if (!data || !data.section_check) return null;
  const t = whatsAppTranslations[locale as keyof typeof whatsAppTranslations];
  return (
    <section className="whatsApp">
      <div className="whatsApp__container">
        <Link href={`https://wa.me/+55${data?.whatsapp}`} target="_blank" title={t.title}>
          <figure className="whatsApp__imgContainer" title={t.title}>
            <ImgDefault className="whatsApp__imgEmphasis" src="/icons/whatsapp-white.svg" alt="whatsapp" />
          </figure>
        </Link>
      </div>
    </section>
  );
};

export default WhatsApp;
