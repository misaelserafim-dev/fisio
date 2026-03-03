export const formDefaultTranslations = {
  pt: {
    msgAwait: "Carregando...",
    msgAttention: "Necessário atenção.",
    msgSend: "Enviar",
    errorLabel: "Preencha o campo.",
    msgTryAgain: "Ocorreu um erro verifique seus campos e tente novamente."
  },
  en: {
    msgAwait: "Loading...",
    msgAttention: "Attention required.",
    msgSend: "Send",
    errorLabel: "Fill in the field.",
    msgTryAgain: "An error occurred, check your fields and try again."
  },
  es: {
    msgAwait: "Cargando...",
    msgAttention: "Atención necesaria",
    msgSend: "para enviar",
    errorLabel: "Complete el campo",
    msgTryAgain: "Se produjo un error, verifique sus campos e inténtelo nuevamente."
  }
} as const;

export type FormDefaultTranslation = typeof formDefaultTranslations;
