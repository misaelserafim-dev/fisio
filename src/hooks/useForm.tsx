"use client";
import validator from "validator";
import { useEffect, useState, useCallback } from "react";
import { isValidCPF, isValidCNPJ } from "@/utils/validateCpfCnpj";

export type TFormField = {
  invalid: boolean;
  errorLabel: string;
  value: any;
  required?: boolean; // default is true
};

export type TForm = {
  [key: string]: TFormField;
};

export const useForm = (initialForm: TForm, trigger?: any[]) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<TForm>(initialForm);

  useEffect(() => {
    if (trigger && trigger.length) {
      setForm(initialForm);
    }
  }, trigger);

  const changeState = useCallback((input: string, field: keyof TFormField, value: any) => {
    setForm((prevForm) => {
      const currentField = prevForm[input];
      return {
        ...prevForm,
        [input]: {
          ...currentField,
          [field]: value,
          ...(field === "value" ? { invalid: false } : {})
        }
      };
    });
  }, []);

  const clearForm = useCallback(() => {
    setForm((prevForm) => {
      const newForm = { ...prevForm };
      Object.keys(newForm).forEach((key) => {
        newForm[key] = { ...newForm[key], value: "", invalid: false, errorLabel: "" };
      });
      return newForm;
    });
  }, []);

  const validation = useCallback(() => {
    let valid = true;
    const verify = { ...form };

    Object.keys(verify).forEach((input) => {
      const value = verify[input].value;
      const isRequired = verify[input].required ?? true;

      verify[input].invalid = false;
      verify[input].errorLabel = " ";

      if (!value && isRequired) {
        verify[input].invalid = true;
        verify[input].errorLabel = "Este campo não pode estar vazio.";
        valid = false;
      }

      if (value) {
        if (input === "email" && !validator.isEmail(value)) {
          verify[input].invalid = true;
          verify[input].errorLabel = "E-mail inválido.";
          valid = false;
        }
        if (input === "password" && !validator.isStrongPassword(value)) {
          verify[input].invalid = true;
          verify[input].errorLabel = "Inclua uma combinação de letras maiúsculas e minúsculas, números e caracteres especiais.";
          valid = false;
        }
        if (input === "passwordConfirm" && !validator.equals(form.password.value || "", value)) {
          verify[input].invalid = true;
          verify[input].errorLabel = "As senhas não são iguais.";
          valid = false;
        }
        if (Array.isArray(value) && !value.length) {
          verify[input].invalid = true;
          verify[input].errorLabel = "Selecione ao menos uma opção.";
          valid = false;
        }
        if ((input === "cpf" || input === "socialId") && !isValidCPF(value)) {
          verify[input].invalid = true;
          verify[input].errorLabel = "CPF inválido.";
          valid = false;
        }
        if (input === "cnpj" && !isValidCNPJ(value)) {
          verify[input].invalid = true;
          verify[input].errorLabel = "CNPJ inválido.";
          valid = false;
        }
      }
    });

    setForm(verify);

    if (!valid) {
      setLoading(false);
    }

    return valid;
  }, [form]);

  return { form, loading, setLoading, changeState, validation, clearForm };
};
