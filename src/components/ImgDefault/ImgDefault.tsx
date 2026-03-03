import Image, { ImageProps } from "next/image";
import "./ImgDefault.scss";

type ImgDefaultProps = ImageProps & {
  skeleton?: boolean;
  wrapperClassName?: string;
};

const ImgDefault = ({
  skeleton = false,
  wrapperClassName,
  className,
  ...props
}: ImgDefaultProps) => {
  return (
    <div className={`imgDefault ${wrapperClassName ?? ""}`}>
      {skeleton && <div className="imgDefault__skeleton" />}

      <Image
        {...props}
        className={`imgDefault__img ${className ?? ""}`}
      />
    </div>
  );
};

export default ImgDefault;