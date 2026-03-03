export function getPath(url: string) {
  if (typeof url !== "string" || !url) {
    return "#";
  }

  try {
    // Verifica se a URL é absoluta (começa com http:// ou https://)
    const isAbsoluteUrl = /^https?:\/\//.test(url);

    if (isAbsoluteUrl) {
      const urlObject = new URL(url);

      if (urlObject.hostname.includes("hmlg")) {
        return urlObject.pathname || "/";
      }

      // Identifica o domínio de homologação na Vercel
      const isVercelHomolog = urlObject.hostname.endsWith("vercel.app");

      // Se não for um domínio da Vercel, retorna a URL sem alterações
      if (!isVercelHomolog) {
        return url;
      }

      // Para ambientes da Vercel, retorna apenas o pathname
      return urlObject.pathname || "/";
    } else {
      // Lida com URLs relativas ou especiais
      if (url.startsWith("#") || url.startsWith("tel://") || url.startsWith("/")) {
        return url;
      }

      // Caso contrário, considera a URL inválida
      console.warn("Invalid relative URL:", url);
      return "#";
    }
  } catch (error) {
    console.error("Invalid URL:", error, url);
    return "#";
  }
}
