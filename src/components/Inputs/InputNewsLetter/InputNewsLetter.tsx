"use client";
import "./InputNewsLetter.scss";
import { FC } from "react";

type InputProp = React.ComponentProps<"input"> & {
  label?: string; // Rótulo opcional.
  erroMsg?: string; // Mensagem de erro opcional.
  invalid?: boolean; // Define se o campo é inválido.
  fullSize?: string;
  loading?: boolean;
};

const InputNewsLetter: FC<InputProp> = ({
  fullSize = "w-100",
  id,
  label,
  erroMsg = "",
  invalid = false,
  loading = false,
  required = false,
  ...props
}) => {
  return (
    <div className={`${fullSize} inputNewsLetter ${invalid && "inputNewsLetter--invalid"}`}>
      <input
        className="inputNewsLetter__element"
        placeholder="Digite seu e-mail"
        id={id}
        autoComplete="off"
        required={required}
      />
      <button type="submit" className="inputNewsLetter__link" disabled={loading}></button>
    </div>
  );
};

export default InputNewsLetter;
