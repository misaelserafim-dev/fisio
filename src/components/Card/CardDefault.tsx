import { FC } from "react";
import ButtonLink from "@/components/Buttons/ButtonLink/ButtonLink";
import ImageDefault from "@/components/ImgDefault/ImgDefault";
import "./CardDefault.scss";

type CardDefaultProps = {
  imageSrc: string;
  title: string;
  description?: string;
  buttonText?: string;
  link?: string;
} & React.ComponentProps<"div">;

const CardDefault: FC<CardDefaultProps> = ({
  imageSrc,
  title,
  description,
  buttonText,
  link = "#",
  className = "",
  ...props
}) => {
  return (
    <div className={`cardDefault ${className}`} {...props}>
      <div className="cardDefault__image">
        <ImageDefault src={imageSrc} alt={title} width={349} height={199} quality={75} />
      </div>
      <div className="cardDefault__content">
        <h3 className="cardDefault__title">{title}</h3>

        {description && (
          <p className="cardDefault__description">{description}</p>
        )}
        {buttonText && (
          <ButtonLink
              className="cardDefault__button"
              linkProps={{
                  url: link,
                  title: buttonText,
                  name: buttonText,
              }}
              variant="primary" 
          />
        )}
      </div>
    </div>
  );
};

export default CardDefault;
