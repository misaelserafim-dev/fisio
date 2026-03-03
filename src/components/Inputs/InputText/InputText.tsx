import "./InputText.scss";
import { FC, ComponentProps } from "react";
import ImgDefault from "@/components/ImgDefault/ImgDefault";

type InputProp = ComponentProps<"input"> & {
  label?: string;
  erroMsg?: string;
  invalid?: boolean;
  fullSize?: string;
};

const InputText: FC<InputProp> = ({ id, label, erroMsg, invalid = false, required = false, fullSize = "w-100", ...props }) => {
  return (
    <div className={`inputText ${invalid && "inputText--invalid"} ${fullSize}`}>
      {label && (
        <label htmlFor={id} className="inputText__label">
          {label}
        </label>
      )}
      <input className="inputText__element" {...{ ...props, id }} />
      {invalid && (
        <div className="inputText__helpContainer">
          <ImgDefault src="/icons/alert.svg" alt="Alerta" className="inputText__helpIcon" />
          <span className="inputText__helpText">{erroMsg}</span>
        </div>
      )}
    </div>
  );
};

export default InputText;
