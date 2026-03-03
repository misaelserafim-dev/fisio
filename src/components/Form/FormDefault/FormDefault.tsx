"use client";
import "./FormDefault.scss";
import { FC, useState, createContext } from "react";
import { sendForm } from "@/config/api";
import { useForm } from "@/hooks/useForm";
import { getSanitize } from "@/lib/getSanitize";
import { formDefaultTranslations } from "./translations";
import useLocale from "@/hooks/useLocale";
import PopUp from "@/components/PopUp/PopUp";
import InputPhone from "../../Inputs/InputPhone/InputPhone";
import InputText from "@/components/Inputs/InputText/InputText";
import InputFile from "@/components/Inputs/InputFile/InputFile";
import InputSelect from "@/components/Inputs/InputSelect/InputSelect";
import InputTextarea from "@/components/Inputs/InputTextarea/InputTextarea";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import CheckBoxDefault from "@/components/Inputs/CheckBoxDefault/CheckBoxDefault";

export const FormResetContext = createContext<{ resetKey: number }>({ resetKey: 0 });

const FormDefault: FC<{ data: any; popup?: any; titlePopUP?: string }> = ({ data, popup }) => {
  if (!data?.formGenerator?.length) return null;

  const [honeypot, setHoneypot] = useState("");
  const [honeyBlock, setHoneyBlock] = useState<number>(0);

  const locale = useLocale();
  const t = formDefaultTranslations[locale as keyof typeof formDefaultTranslations];
  const sendButtonLabel = t.msgSend;

  const [popUpStatus, setPopUpStatus] = useState<string>("");
  const [send, setSend] = useState({ success: false, msg: "" });

  const [resetKey, setResetKey] = useState(0);
  const triggerReset = () => setResetKey((k) => k + 1);

  const { form, changeState, validation, loading, setLoading, clearForm } = useForm(
    data?.formGenerator?.reduce((acc: any, field: any) => {
      const sanitizedLabel = getSanitize(field?.inputLabel);
      acc[sanitizedLabel] = {
        invalid: false,
        errorLabel: `${t.errorLabel} ${field?.inputLabel}`,
        value: (() => {
          if (field?.inputType === "checkbox") {
            return false;
          } else if (field?.inputType === "select") {
            return field?.inputSelect_repeater?.[0]?.title || "";
          } else if (field?.inputType === "file") {
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

    if (honeypot || honeyBlock != 0) {
      setHoneyBlock(Date.now());
      return;
    }

    if (!validation()) return;

    setLoading(true);

    const mail = new FormData();
    mail.append("_wpcf7_unit_tag", data.form);
    Object.keys(form).forEach((key) => {
      const fieldValue = form[key].value;
      const fieldName = `${key}-${data.form}`;
      if (fieldValue instanceof File) {
        mail.append(fieldName, fieldValue);
      } else if (fieldValue !== null && fieldValue !== undefined) {
        mail.append(fieldName, fieldValue.toString());
      }
    });

    try {
      const resp: any = await sendForm(mail, data.form);
      if (!!resp?.invalid_fields?.length) {
        setSend({ success: false, msg: t.msgAttention });
        resp.invalid_fields.forEach((fieldError: any) => {
          const fullField = fieldError.field as string; // e.g. "e-mail-563"
          const key = fullField.replace(`-${data.form}`, ""); // e.g. "e-mail"
          changeState(key, "invalid", true);
          changeState(key, "errorLabel", fieldError.message);
        });
        return;
      } else {
        data?.popUp_check && setPopUpStatus(resp.message);
      }
      setSend({ success: true, msg: resp.message });
      triggerReset();
      clearForm();
    } catch (error) {
      console.log(error);
      setSend({ success: false, msg: t.msgTryAgain });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormResetContext.Provider value={{ resetKey }}>
      <div>
        <form className={`formDefault form-${data?.form}`} onSubmit={postForm}>
          <input
            type="text"
            name="name"
            tabIndex={-1}
            value={honeypot}
            autoComplete="off"
            className="formDefault__honeypot w100"
            onChange={(e) => setHoneypot(e.target.value)}
          />
          {data?.formGenerator?.map((item: any, index: number) => {
            const { inputType, inputLabel, inputPlaceholderTerms, inputWidth, inputRequired, inputSelect_repeater } = item;
            const fieldKey = getSanitize(inputLabel);
            if (inputType === "tel") {
              return (
                <InputPhone
                  key={index}
                  fullSize={inputWidth}
                  id={`${fieldKey}-${data?.form}`}
                  label={`${inputLabel}${inputRequired && "*"}`}
                  name={`${fieldKey}-${data.form}`}
                  required={inputRequired}
                  value={form[fieldKey].value}
                  invalid={form[fieldKey].invalid}
                  erroMsg={form[fieldKey].errorLabel}
                  onChange={(e: any) => changeState(fieldKey, "value", e.target.value)}
                />
              );
            }
            if (inputType === "textarea") {
              return (
                <InputTextarea
                  key={index}
                  fullSize={inputWidth}
                  id={`${fieldKey}-${data?.form}`}
                  label={`${inputLabel}${inputRequired && "*"}`}
                  name={`${fieldKey}-${data.form}`}
                  // required={inputRequired}
                  value={form[fieldKey].value}
                  invalid={form[fieldKey].invalid}
                  erroMsg={form[fieldKey].errorLabel}
                  onChange={(e) => changeState(fieldKey, "value", e.target.value)}
                />
              );
            }
            if (inputType === "select" && Array.isArray(inputSelect_repeater)) {
              return (
                <InputSelect
                  key={index}
                  fullSize={inputWidth}
                  id={`${fieldKey}-${data?.form}`}
                  label={`${inputLabel}${inputRequired && "*"}`}
                  name={`${fieldKey}-${data.form}`}
                  required={inputRequired}
                  value={form[fieldKey].value}
                  invalid={form[fieldKey].invalid}
                  erroMsg={form[fieldKey].errorLabel}
                  onChange={(e) => {
                    changeState(fieldKey, "value", e.target.value);
                  }}
                  options={inputSelect_repeater.map((option: any) => option.title)}
                />
              );
            }
            if (inputType === "acceptance") {
              return (
                <CheckBoxDefault
                  key={index}
                  type="checkbox"
                  fullSize={inputWidth}
                  required={inputRequired}
                  id={`${fieldKey}-${data?.form}`}
                  name={`${fieldKey}-${data.form}`}
                  label={`${inputPlaceholderTerms}`}
                  erroMsg={form[fieldKey].errorLabel}
                  invalid={form[fieldKey].invalid}
                  onChange={(e) => changeState(fieldKey, "value", e.target.checked)}
                />
              );
            }
            if (inputType === "file") {
              return (
                <InputFile
                  key={index}
                  type="file"
                  fullSize={inputWidth}
                  id={`${fieldKey}-${data?.form}`}
                  name={`${fieldKey}-${data.form}`}
                  label={`${inputLabel}${inputRequired && "*"}`}
                  required={inputRequired}
                  invalid={form[fieldKey].invalid}
                  erroMsg={form[fieldKey].errorLabel}
                  onChange={(e) => changeState(fieldKey, "value", e.target.files?.[0] || null)}
                />
              );
            }
            return (
              <InputText
                key={index}
                type={inputType}
                fullSize={inputWidth}
                id={`${fieldKey}-${data?.form}`}
                name={`${fieldKey}-${data.form}`}
                label={`${inputLabel}${inputRequired && "*"}`}
                required={inputRequired}
                value={form[fieldKey].value}
                invalid={form[fieldKey].invalid}
                erroMsg={form[fieldKey].errorLabel}
                onChange={(e) => changeState(fieldKey, "value", e.target.value)}
              />
            );
          })}
          <div className="formDefault__btnContainer">
            <ButtonDefault disabled={loading} type="submit" children={loading ? t.msgAwait : sendButtonLabel} />
          </div>
        </form>
        <div className="formDefault__resp">
          <p className={`formDefault${send.success ? "__responseSuccess" : "__responseError"}`}>{send.msg}</p>
        </div>
        <PopUp
          data={{
            title: "Mensagem enviada com sucesso!",
            description:
              "Obrigado por entrar em contato com a Termoplast!<br> Nossa equipe recebeu sua solicitação e retornará em breve."
          }}
          active={popUpStatus !== "" && data?.popUp_check}
        />
      </div>
    </FormResetContext.Provider>
  );
};

export default FormDefault;
