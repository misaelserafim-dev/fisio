import "./AtendimentoCasa.scss";
import { FC } from "react";
import ButtonLink from "@/components/Buttons/ButtonLink/ButtonLink";

const AtendimentoCasa: FC = () => {
  return (
    <section id="atendimento-em-casa" className="atendimentoCasa">
      <div className="atendimentoCasa__container">
        <p className="atendimentoCasa__eyebrow">Conforto e cuidado</p>
        <h2 className="atendimentoCasa__title">Atendimento em casa</h2>
        <p className="atendimentoCasa__description">
          Levamos a fisioterapia ate voce, com acompanhamento personalizado no seu ambiente e foco em seguranca,
          praticidade e recuperacao funcional.
        </p>

        <ButtonLink
          variant="inverse"
          linkProps={{
            url: "#contact",
            name: "Solicitar visita domiciliar",
            title: "Solicitar visita domiciliar",
          }}
          iconRight="chevron-right"
        />
      </div>
    </section>
  );
};

export default AtendimentoCasa;
