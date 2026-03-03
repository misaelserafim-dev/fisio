"use client";
import "./FormNewsLetter.scss";
import { FC, useState } from "react";
import { useForm } from "@/hooks/useForm";
import { sendForm } from "@/config/api";
import { getSanitize } from "@/lib/getSanitize";
import useLocale from "@/hooks/useLocale";
import PopUp from "@/components/PopUp/PopUp";
import InputNewsLetter from "../../Inputs/InputNewsLetter/InputNewsLetter";

const FormNewsLetter: FC<{
  data: any;
  popup: boolean;
  titlePopUP?: string;
}> = ({ data, popup = false, titlePopUP = "" }) => {
  if (!data || !data?.formGenerator) return null;

  const locale = useLocale();
  const erroMsg = locale === "pt" ? "Necessário atenção" : "Attention needed";

  const [send, setSend] = useState({ success: false, msg: "" });
  const [popUp, setPopUp] = useState<string>("");

  const { form, changeState, validation, loading, setLoading, clearForm } = useForm(
    data.formGenerator.reduce((acc: any, field: any) => {
      const sanitizedLabel = getSanitize(field.inputLabel);
      acc[sanitizedLabel] = {
        invalid: false,
        errorLabel: `Preencha o campo ${field.inputLabel}`,
        value: (() => {
          if (field.inputType === "checkbox") {
            return false;
          } else if (field.inputType === "select") {
            return field.inputSelect_repeater?.[0]?.title || "";
          } else if (field.inputType === "file") {
            return null as File | null;
          } else {
            return "";
          }
        })()
      };
      return acc;
    }, {})
  );

  const postForm = async (e: any) => {
    e.preventDefault();
    if (!validation()) return;

    setLoading(true);

    const mail = new FormData();
    mail.append("_wpcf7_unit_tag", data.form);
    Object.keys(form).forEach((key) => {
      const fieldValue = form[key].value;
      if (fieldValue instanceof File) {
        mail.append(key, fieldValue);
      } else if (fieldValue !== null && fieldValue !== undefined) {
        mail.append(key, fieldValue.toString());
      }
    });
    try {
      const resp: any = await sendForm(mail, data.form);
      if (resp?.invalid_fields?.length) {
        setSend({
          success: false,
          msg: "Ocorreu um erro verifique seus campos e tente novamente."
        });
        resp?.invalid_fields.forEach((input: any) => {
          console.log(input.field);
        });
        return;
      } else {
        setPopUp(resp.message);
      }

      setSend({ success: true, msg: resp.message });
      clearForm();
    } catch (error) {
      console.log(error);
      setSend({
        success: false,
        msg: "Ocorreu um erro verifique seus campos e tente novamente."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`formNewsLetter form-${data?.form}`}>
      <form className="formNewsLetter__content" onSubmit={postForm}>
        {data.formGenerator.map((item: any, index: number) => {
          const { inputType, inputLabel, inputWidth, inputRequired, inputSelect_repeater } = item;
          return (
            <InputNewsLetter
              key={index}
              fullSize={inputWidth}
              id={`${getSanitize(inputLabel)}-${data?.form}`}
              name={getSanitize(inputLabel)}
              type={inputType}
              label={`${inputLabel}${inputRequired && "*"}`}
              required={inputRequired}
              erroMsg={erroMsg}
              invalid={false}
              onChange={(e) => changeState(getSanitize(inputLabel), "value", e.target.value)}
            />
          );
        })}
      </form>
      <div className="formNewsLetter__resp">
        <p className={`formDefault${send.success ? "__responseSuccess" : "__responseError"}`}>{send.msg}</p>
      </div>
      <PopUp data={{ title: titlePopUP, description: popUp }} active={popUp !== ""} />
    </div>
  );
};

export default FormNewsLetter;
