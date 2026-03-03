import "./CheckBoxDefault.scss";
import { FC, ComponentProps } from "react";
import TextDefault from "@/components/TextDefault/TextDefault";

type InputProp = ComponentProps<"input"> & {
  label?: string;
  erroMsg: string;
  invalid?: boolean;
  fullSize?: string;
};

const CheckBoxDefault: FC<InputProp> = ({ id, label, erroMsg, invalid, fullSize = "w-100", ...props }) => {
  return (
    <div className={`checkBoxDefault ${invalid && "checkBoxDefault--invalid"}`}>
      <div className="checkBoxDefault__container">
        <input className="checkBoxDefault__element checkBoxDefault__element--invalid" id={id} {...props} type="checkbox" />
        {label && (
          <label htmlFor={id} className={`checkBoxDefault__label  ${invalid && "checkBoxDefault__label--invalid"}`}>
            <TextDefault>{label}</TextDefault>
          </label>
        )}
      </div>
      <span className={`checkBoxDefault__helpText`}>{invalid && erroMsg}</span>
    </div>
  );
};

export default CheckBoxDefault;
