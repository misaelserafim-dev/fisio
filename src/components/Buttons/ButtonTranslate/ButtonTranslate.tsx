"use client";
import "./ButtonTranslate.scss";
import { FC, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import useLocale from "@/hooks/useLocale";
import Link from "next/link";

interface ButtonTranslateProps {
  dropDownState: string;
  setDropDownState: React.Dispatch<React.SetStateAction<string>>;
}

const FLAG_ICONS: Record<string, { title: string; flag: string }> = {
  en: { title: "English", flag: "/assets/icons/flag-united-kingdom.svg" },
  pt: { title: "Português", flag: "/assets/icons/flag-brasil.svg" },
  es: { title: "Español", flag: "/assets/icons/flag-spain.svg" }
};

const ButtonTranslate: FC<ButtonTranslateProps> = ({ dropDownState, setDropDownState }) => {
  const params = usePathname();
  const locale = useLocale();
  const [isActive, setIsActive] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState<{ lang: string; url: string }[]>([]);

  const changeLang = () => {
    if (typeof window !== "undefined") {
      const langLinks = document.querySelectorAll('link[rel="alternate"][hreflang]') as NodeListOf<HTMLLinkElement>;
      if (langLinks.length > 0) {
        const languages = Array.from(langLinks).map((link) => ({
          lang: link.hreflang,
          url: link.href
        }));
        setAvailableLanguages(languages);
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  };

  useEffect(() => {
    changeLang();
    document.addEventListener("load", changeLang);
    return () => {
      document.removeEventListener("load", changeLang);
    };
  }, [params]);

  return (
    <div className={`buttonTranslate ${isActive && "active"} ${dropDownState === "buttonTranslate" && "clicked"}`}>
      <div className="buttonTranslate__container">
        <button
          title="See available translations"
          className="buttonTranslate__content buttonTranslate__content--flagActive"
          onClick={() => (dropDownState === "buttonTranslate" ? setDropDownState("") : setDropDownState("buttonTranslate"))}
          onBlur={() => setDropDownState("")}
        >
          <figure className="buttonTranslate__imgContainer">
            <img
              src={FLAG_ICONS[locale]?.flag || FLAG_ICONS.en.flag}
              alt={`Flag of ${FLAG_ICONS[locale]?.title || FLAG_ICONS.en.title}`}
              className="buttonTranslate__imgEmphasis"
            />
          </figure>
          <p className="buttonTranslate__title">{FLAG_ICONS[locale]?.title || FLAG_ICONS.en.title}</p>
        </button>

        <div className="buttonTranslate__content buttonTranslate__content--flagOptions">
          {isActive &&
            availableLanguages
              .filter((language) => language.lang !== locale)
              .map(({ lang, url }) => (
                <Link
                  key={lang}
                  href={url}
                  title={`Access the page in ${lang.toUpperCase()}`}
                  className="buttonTranslate__btn"
                  onFocus={() => setDropDownState("buttonTranslate")}
                  onBlur={() => setDropDownState("")}
                >
                  <figure className="buttonTranslate__imgContainer">
                    <img
                      src={FLAG_ICONS[lang]?.flag || FLAG_ICONS.en.flag}
                      alt={`Flag of ${lang}`}
                      className="buttonTranslate__imgEmphasis"
                    />
                  </figure>
                  <p className="buttonTranslate__title">{FLAG_ICONS[lang]?.title || FLAG_ICONS.en.title}</p>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonTranslate;
