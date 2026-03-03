"use client";
import "./HeaderLocale.scss";
import { FC, Dispatch } from "react";
import TranslateButton from "@/components/Buttons/ButtonTranslate/ButtonTranslate";

interface HeaderLocaleProps {
  data: any;
  dropDownState: string;
  setDropDownState: Dispatch<React.SetStateAction<string>>;
}

const HeaderLocale: FC<HeaderLocaleProps> = ({ data, dropDownState, setDropDownState }) => {
  return (
    <div className="headerLocale">
      {data?.repeaterSup && (
        <div className="headerLocale__content">
          {data.repeaterSup.map((item: any, index: number) => (
            <a
              key={index}
              href={item.link?.url}
              target={item.link?.target}
              title={item.link?.title}
              className="headerLocale__title"
            >
              <figure className="headerLocale__imgContainer">
                <img className="headerLocale__imgEmphasis" src={item.image?.url} alt={item.image?.alt} />
              </figure>
              <p>{item.link?.title}</p>
            </a>
          ))}
        </div>
      )}
      {data?.translate_check && <TranslateButton {...{ dropDownState, setDropDownState }} />}
    </div>
  );
};

export default HeaderLocale;
