"use client";
import "./AcceptanceCookies.scss";
import { FC, useState, useEffect } from "react";
import { acceptanceCookies } from "./translations";
import useLocale from "@/hooks/useLocale";
import TextDefault from "../TextDefault/TextDefault";
import ButtonDefault from "../Buttons/ButtonDefault/ButtonDefault";

interface AcceptanceCookiesProps {
  data: any;
}

// Função para definir o cookie de aceitação
const setCookie = (name: string, value: any, days: number) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Lax`;
};

// Função para obter um cookie
const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
};

const AcceptanceCookies: FC<AcceptanceCookiesProps> = ({ data }) => {
  if (!data?.section_check) return;

  const locale = useLocale();
  const t = acceptanceCookies[locale as keyof typeof acceptanceCookies];

  const [accept, setAccept] = useState<boolean>(true);

  useEffect(() => {
    setAccept(getCookie("userConsent") === "true");
  }, []);

  const handleAccept = () => {
    setCookie("userConsent", "true", 365);
    setAccept(true);
  };

  return (
    <div className={`acceptanceCookies ${!accept && "acceptanceCookies--active"}`}>
      <div className="acceptanceCookies__container">
        <div className="acceptanceCookies__descriptionContainer">
          <TextDefault className="acceptanceCookies__description">{data?.description}</TextDefault>
        </div>
        <ButtonDefault variant="secondary" onClick={() => handleAccept()} title={t.title} children={t.label} />
      </div>
    </div>
  );
};

export default AcceptanceCookies;
