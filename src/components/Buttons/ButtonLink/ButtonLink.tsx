'use client';
import { FC, MouseEvent, useRef } from "react";
import { Icons } from "@/@types/icons";
import { ButtonVariants } from "@/@types/variants";
import LinkDefault, { LinkDefaultProps } from "@/components/LinkDefault/LinkDefault";
import "./ButtonLink.scss";

type ButtonLinkProps = {
  linkProps: { url?: string; title?: string; target?: string; name: string };
  variant?: ButtonVariants;
  disabled?: boolean;
  circular?: boolean;
  iconLeft?: Icons;
  iconRight?: Icons;
  active?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

const ButtonLink: FC<ButtonLinkProps> = ({
  linkProps,
  variant = "primary",
  disabled,
  circular,
  iconLeft,
  iconRight,
  active = false,
  ...props
}) => {
  const classes = `buttonLink buttonLink__${variant}
    ${circular ? "buttonLink--circular" : ""}
    ${disabled ? `buttonLink__${variant}--disabled` : ""}
    ${active ? `buttonLink__${variant}--active` : ""}
  `.replace(/\s+/g, " ").trim();

  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Passa a posição para o CSS
    buttonRef.current.style.setProperty("--mouse-x", `${x}px`);
    buttonRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const content = (
    <>
      {!!iconLeft && (
        <div className="buttonLink__iconContainer">
          <img className="buttonLink__icon" src={`/icons/${iconLeft}.svg`} alt="Ícone esquerdo" aria-hidden="true" />
        </div>
      )}

      {!!linkProps?.title && (
        <span className={`buttonLink__text buttonLink__text--${variant}`}>
          {linkProps.title}
        </span>
      )}

      {!!iconRight && (
        <div className="buttonLink__iconContainer">
          <img className="buttonLink__icon" src={`/icons/${iconRight}.svg`} alt="Ícone ilustrativo" aria-hidden="true" />
        </div>
      )}
    </>
  );

  if (linkProps?.url) {
    return (
      <LinkDefault
        className={classes}
        href={linkProps.url}
        title={linkProps.name}
        target={linkProps.target}
        ref={buttonRef as any}
        onMouseMove={handleMouseMove}
      >
        {content}
      </LinkDefault>
    );
  }

  return (
    <button
      className={classes}
      type="button"
      disabled={disabled}
      {...props}
      ref={buttonRef as any}
      onMouseMove={handleMouseMove}
    >
      {content}
    </button>
  );
};

export default ButtonLink;