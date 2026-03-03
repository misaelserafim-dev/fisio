import { FC } from "react";
import Link from "next/link";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import TextDefault from "@/components/TextDefault/TextDefault";

import "./Footer.scss";

const Footer: FC = () => {

  return (
    <section className="footer">
      <div className="footer__container">
        <h2>footer</h2>
        {/* <div className="footer__logoPage">
          <ImgDefault
            className="footer__logo"
            src={mock.logo.src}
            alt={mock.logo.alt}
            width={mock.logo.width}
            height={mock.logo.height}
            quality={75}
          />
        </div> */}
      </div>
    </section>
  );
};

export default Footer;
