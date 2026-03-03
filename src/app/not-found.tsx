import "./not-found.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada - Thermoplast",
  description: "A página que você está procurando não foi encontrada. Verifique o URL ou volte para a página inicial."
};

export default async function NotFound() {
  return (
    <main id="not-found">
      <></>
    </main>
  );
}
