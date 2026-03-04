"use client";
import "./Header.scss";
import { FC, useState, useEffect } from "react";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import useScrollDirectionClass from "@/hooks/useScrollDirectionClass";

export const headerData = {
  repeaterMain: []
};

const Header: FC = () => {
  const statusScroll = useScrollDirectionClass();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [dropDownState, setDropDownState] = useState<string>("");

  useEffect(() => {
    const nav = document.querySelector(".header__nav") as HTMLElement | null;
    const indicator = document.querySelector(".header__nav_indicator") as HTMLElement | null;
    const items = document.querySelectorAll(".header__nav_item a") as NodeListOf<HTMLElement>;

    if (!nav || !indicator || items.length === 0) return;

    const moveIndicator = (el: HTMLElement) => {
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      indicator.style.width = `${elRect.width}px`;
      indicator.style.transform = `translate(${elRect.left - navRect.left}px, -50%)`;
    };

    const handleMouseLeave = () => {
      const active = document.querySelector(
        '.header__nav_item a[aria-current="page"]'
      ) as HTMLElement | null;

      if (active) moveIndicator(active);
    };

    items.forEach((item, index) => {
      const handleEnter = () => moveIndicator(item);
      const handleFocus = () => moveIndicator(item);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          const next = items[index + 1] || items[0];
          next.focus();
        }

        if (e.key === "ArrowLeft") {
          e.preventDefault();
          const prev = items[index - 1] || items[items.length - 1];
          prev.focus();
        }
      };

      item.addEventListener("mouseenter", handleEnter);
      item.addEventListener("focus", handleFocus);
      item.addEventListener("keydown", handleKeyDown);

      return () => {
        item.removeEventListener("mouseenter", handleEnter);
        item.removeEventListener("focus", handleFocus);
        item.removeEventListener("keydown", handleKeyDown);
      };
    });

    nav.addEventListener("mouseleave", handleMouseLeave);

    // Ativa primeiro item como página atual se não existir
    if (!document.querySelector('[aria-current="page"]')) {
      items[0].setAttribute("aria-current", "page");
    }

    const active = document.querySelector(
      '.header__nav_item a[aria-current="page"]'
    ) as HTMLElement | null;

    if (active) moveIndicator(active);

    return () => {
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <header
        className={`header header--${statusScroll} ${
          (dropDownState !== "" || openMenu !== false) && "header--active"
        }`}
      >
        <div className="header__container">
          <div className="header__logo">
            <a href="/" title="Fisio - Clínica de Fisioterapia">
              <ImgDefault
                src={"/images/logo1.png"}
                alt="Logo da Fisio"
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </a>
          </div>

          <nav className={`header__nav ${openMenu ? "header__nav--active" : ""}`}>
            <span className="header__nav_indicator" />

            <ul className="header__nav_list">
              <li className="header__nav_item">
                <a href="#banner" aria-current="page">
                  Início
                </a>
              </li>
              <li className="header__nav_item">
                <a href="#services">Serviços</a>
              </li>
              <li className="header__nav_item">
                <a href="#about">Sobre</a>
              </li>
              <li className="header__nav_item">
                <a href="#contact">Contato</a>
              </li>
            </ul>
          </nav>

          <a
            href="tel:+5541999999999"
            className="header__phone"
            aria-label="Ligar para clínica Fisio"
          >
            (41) 99999-9999
          </a>

          <button
            className={`header__menu_button ${
              openMenu ? "header__menu_button--active" : ""
            }`}
            onClick={() => setOpenMenu(!openMenu)}
            aria-label="Menu"
          >
            <span className="header__menu_icon" />
          </button>
        </div>
      </header>

      <div
        className="overlay"
        onClick={() => {
          setDropDownState("");
          setOpenMenu(false);
        }}
      />
    </>
  );
};

export default Header;