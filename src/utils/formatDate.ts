import { ptBR } from "date-fns/locale";
import { format, parse } from "date-fns";

export function formatDate({
  date,
  utcOffsetHours = 3,
  type = "date"
}: {
  date: string | Date | undefined;
  utcOffsetHours?: number;
  type?: "dateHour" | "date" | "hour" | "api" | "dateLocal" | "longDate";
}) {
  if (!date) return "";
  try {
    const dateString = new Date(date);
    if (type === "hour") return format(dateString, "HH:mm", { locale: ptBR });
    if (type === "dateHour") return format(dateString, "dd'/'MM'/'yyyy - HH:mm", { locale: ptBR });
    if (type === "date") return format(dateString, "dd'/'MM'/'yyyy", { locale: ptBR });
    dateString.setHours(dateString.getHours() + utcOffsetHours);
    if (type === "dateLocal") return format(dateString, "dd'/'MM'/'yyyy", { locale: ptBR });
    if (type === "longDate") return format(dateString, "PPP", { locale: ptBR });
    if (type === "api") {
      const parsedDate = parse(date.toString(), "dd/MM/yyyy", new Date(), { locale: ptBR });
      return format(parsedDate, "yyyy-MM-dd");
    }
  } catch (e) {
    return "";
  }
}
