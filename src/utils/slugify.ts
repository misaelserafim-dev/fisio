export default function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\//g, "-") // substitui barras por hífen
    .replace(/\s+/g, "-") // substitui espaços por hífen
    .replace(/[^\w-]+/g, "") // remove caracteres não alfanuméricos (exceto hífen)
    .replace(/--+/g, "-") // evita múltiplos hífens
    .replace(/^-+|-+$/g, ""); // remove hífens no início/fim
}
