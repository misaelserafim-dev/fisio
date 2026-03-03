import "./InputTextarea.scss";
import { FC, ComponentProps } from "react";
import ImgDefault from "@/components/ImgDefault/ImgDefault";

type InputProp = ComponentProps<"textarea"> & {
  label?: string;
  value?: string;
  erroMsg?: string;
  invalid?: boolean;
  fullSize?: string;
};
const InputTextarea: FC<InputProp> = ({ label, erroMsg, invalid, id, fullSize = "w-100", ...props }) => {
  return (
    <div className={`inputTextarea ${invalid && "inputTextarea--invalid"} ${fullSize} `}>
      <label htmlFor={id} className="inputTextarea__label">
        {label}
      </label>
      <textarea className="inputTextarea__element" {...{ ...props, id }} />
      {invalid && (
        <div className="inputTextarea__helpContainer">
          <ImgDefault src="/icons/alert.svg" alt="Alerta" className="inputTextarea__helpIcon" />
          <span className="inputTextarea__helpText">{erroMsg}</span>
        </div>
      )}
    </div>
  );
};
export default InputTextarea;
