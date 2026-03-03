import "./InputFile.scss";
import { FC } from "react";

type InputProp = React.ComponentProps<"input"> & {
  label?: string;
  erroMsg: string;
  invalid?: boolean;
  fullSize?: string;
};

const InputFile: FC<InputProp> = ({ id, fullSize = "w-100", label, erroMsg, invalid, ...props }) => {
  return (
    <div className={`inputFile ${invalid && "inputFile--invalid"} ${fullSize}`}>
      {label && (
        <label htmlFor={id} className={`inputFile__label ${invalid && "inputFile__label--invalid"}`}>
          {label}
        </label>
      )}
      <input className="inputFile__element" id={id} type="file" {...props} />
      <span className="inputFile__helpText">{invalid && erroMsg}</span>
    </div>
  );
};

export default InputFile;
