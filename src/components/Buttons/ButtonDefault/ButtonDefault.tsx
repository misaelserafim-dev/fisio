import "./ButtonDefault.scss";
import { Icons } from "@/@types/icons";
import { ButtonVariants } from "@/@types/variants";
import { FC, ButtonHTMLAttributes } from "react";

type ButtonDefaultProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariants;
  children?: string;
  disabled?: boolean;
  circular?: boolean;
  iconLeft?: Icons;
  iconRight?: Icons;
};

const ButtonDefault: FC<ButtonDefaultProps> = ({
  children,
  variant = "primary",
  circular,
  iconLeft,
  iconRight,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`buttonDefault buttonDefault__${variant}  ${circular && `buttonDefault--circular`} ${
        disabled && `buttonDefault__${variant}--disabled`
      }`}
      disabled={disabled}
      title={props?.title ?? children}
      {...props}
    >
      {!!iconLeft && (
        <div className="buttonDefault__iconContainer">
          <img className="buttonDefault__icon" src={`/icons/${iconLeft}.svg`} alt={iconRight} />
        </div>
      )}
      {!!children && <span className={`buttonDefault__text buttonDefault__text--${variant}`}>{children}</span>}
      {!!iconRight && (
        <div className="buttonDefault__iconContainer">
          <img className="buttonDefault__icon" src={`/icons/${iconRight}.svg`} alt={iconRight} />
        </div>
      )}
    </button>
  );
};

export default ButtonDefault;
