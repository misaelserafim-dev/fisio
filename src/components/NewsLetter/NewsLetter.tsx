"use client";
import "./NewsLetter.scss";
import { FC, useState } from "react";
import { sendForm } from "@/config/api";
import validator from "validator";
import TextDefault from "../TextDefault/TextDefault";
import InputText from "../Inputs/InputText/InputText";
import ButtonDefault from "../Buttons/ButtonDefault/ButtonDefault";
import CheckBoxDefault from "../Inputs/CheckBoxDefault/CheckBoxDefault";

interface NewsLetterProps {
  data: any;
}

const NewsLetter: FC<NewsLetterProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [envio, setEnvio] = useState({ success: false, msg: "" });
  const [form, setForm] = useState(() => ({
    client: { invalid: false, errorLabel: "Digite seu nome", value: "" },
    email: { invalid: false, errorLabel: "Digite seu e-mail", value: "" },
    accept: { invalid: false, errorLabel: "Aceite os termos", value: "" }
  }));

  const changeState = (input: string, field: string, value: string | boolean) => {
    if (field === "value") {
      setForm((prevValue: any) => ({
        ...prevValue,
        [input]: { ...prevValue[input], invalid: false }
      }));
    }
    setForm((prevValue: any) => ({
      ...prevValue,
      [input]: { ...prevValue[input], [field]: value }
    }));
  };

  const validation = () => {
    let valid = true;
    for (const input in form) {
      if (Object.prototype.hasOwnProperty.call(form, input)) {
        const field = form[input as keyof typeof form].value;
        if (input === "accept" && !field) {
          changeState(input, "invalid", true);
          changeState(input, "errorLabel", "Você deve aceitar os termos");
          valid = false;
        }
        if (!field) {
          changeState(input, "invalid", true);
          changeState(input, "errorLabel", "Este campo não pode estar vazio");
          valid = false;
        }
        if (field && input === "email") {
          if (!validator.isEmail(field)) {
            changeState(input, "invalid", true);
            changeState(input, "errorLabel", "E-mail inválido");
            valid = false;
          }
        }
      }
    }
    if (!valid) {
      setLoading(false);
    }
    return valid;
  };

  const postForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const isValid = validation();
    if (!isValid) return;
    const mail = new FormData();
    mail.append("_wpcf7_unit_tag", data.form);
    mail.append("client", form?.client.value);
    mail.append("email", form?.email.value);
    mail.append("accept", form?.accept.value ? "true" : "false");
    try {
      const resp: any = await sendForm(mail, data.form);
      if (resp?.invalid_fields?.length) {
        setEnvio({
          success: false,
          msg: "Ocorreu um erro verifique seus campos e tente novamente."
        });
        resp?.invalid_fields.forEach((input: any) => {
          console.log(input.field);
        });
        return;
      }
      setEnvio({ success: true, msg: resp.message });
      clear();
    } catch (error) {
      console.log(error);
      setEnvio({
        success: false,
        msg: "Ocorreu um erro verifique seus campos e tente novamente."
      });
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    for (const input in form) {
      if (Object.prototype.hasOwnProperty.call(form, input)) {
        changeState(input, "value", "");
      }
    }
  };

  return (
    <div className="newsLetter">
      <div className="newsLetter__container">
        <div className="newsLetter__titleContainer">
          <TextDefault className="newsLetter__title">Inscreva-se na nossa Newsletter!</TextDefault>
        </div>
        <form className="newsLetter__formContainer" onSubmit={undefined}>
          <InputText
            id="client"
            label="Nome*"
            name="client"
            type="client"
            value={form.client.value}
            erroMsg={form.client.errorLabel}
            invalid={form.client.invalid}
            onChange={(e) => changeState("client", "value", e.target.value)}
          />
          <InputText
            id="email"
            label="E-mail*"
            name="email"
            type="text"
            value={form.email.value}
            erroMsg={form.email.errorLabel}
            invalid={form.email.invalid}
            onChange={(e) => changeState("email", "value", e.target.value)}
          />
          <CheckBoxDefault
            id="accept"
            label={data?.title}
            name="accept"
            type="checkbox"
            value={form.accept.value.toString()}
            erroMsg={form.accept.errorLabel}
            invalid={form.accept.invalid}
            onChange={(e) => changeState("accept", "value", e.target.checked)}
          />
          <ButtonDefault type="submit">{loading ? "Aguarde..." : "INSCREVA-SE!"}</ButtonDefault>
        </form>
        <div className="newsLetter__resp">
          <p className={envio.success ? "formResponseSuccess" : "formResponseError"}>{envio.msg}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
