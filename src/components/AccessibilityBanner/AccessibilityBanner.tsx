"use client";
import "./AccessibilityBanner.scss";
import Link from "next/link";
import TextDefault from "../TextDefault/TextDefault";

interface AccessibilityBannerProps {
  data: any;
}
const AccessibilityBanner: React.FC<AccessibilityBannerProps> = ({ data }) => {
  if (!data || !data?.section_check) return;

  const directionFocus = (elementId: string) => {
    const targetElement = document.querySelector(elementId) as HTMLElement;
    if (targetElement) {
      targetElement.setAttribute("tabindex", "-1");
      targetElement.focus();
    }
  };

  return (
    <Link
      href={data?.link}
      onClick={(e) => {
        e.preventDefault();
        directionFocus(data?.link);
      }}
      title="Modo Acessível: Use Tab para navegar."
      className={`accessibilityBanner`}
    >
      <div className="accessibilityBanner__container">
        <TextDefault>{data?.title}</TextDefault>
      </div>
    </Link>
  );
};

export default AccessibilityBanner;
