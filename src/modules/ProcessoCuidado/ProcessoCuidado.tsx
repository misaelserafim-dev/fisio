import "./ProcessoCuidado.scss";
import { FC } from "react";

type ProcessoStep = {
  id: string;
  title: string;
  description: string;
};

const STEPS: ProcessoStep[] = [
  {
    id: "01",
    title: "Consulta inicial",
    description: "Entendemos sua queixa, rotina e objetivo para iniciar com clareza.",
  },
  {
    id: "02",
    title: "Avaliacao funcional",
    description: "Leitura precisa de mobilidade, dor e padrao de movimento.",
  },
  {
    id: "03",
    title: "Plano personalizado",
    description: "Estrategia terapeutica desenhada para o seu momento clinico.",
  },
  {
    id: "04",
    title: "Acompanhamento",
    description: "Ajustes finos ao longo da evolucao para resultado consistente.",
  },
];

const ProcessoCuidado: FC = () => {
  return (
    <section id="processo" className="processoCuidado sectionInline" aria-labelledby="processo-title">
      <div className="processoCuidado__intro">
        <p className="processoCuidado__eyebrow">Metodo exclusivo</p>
        <h2 id="processo-title" className="processoCuidado__title">
          Um processo claro, discreto e totalmente personalizado
        </h2>
        <p className="processoCuidado__description">
          Cada etapa foi pensada para oferecer precisao clinica com experiencia elegante e sem excessos.
        </p>
      </div>

      <ol className="processoCuidado__list" aria-label="Etapas do processo">
        {STEPS.map((step) => (
          <li key={step.id} className="processoCuidado__item">
            <span className="processoCuidado__index">{step.id}</span>
            <h3 className="processoCuidado__cardTitle">{step.title}</h3>
            <p className="processoCuidado__cardDescription">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ProcessoCuidado;

