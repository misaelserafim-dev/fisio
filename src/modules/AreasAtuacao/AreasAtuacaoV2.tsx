"use client";

import "./AreasAtuacaoV2.scss";
import { FC, MouseEvent } from "react";
import areasAtuacaoMock from "@/mocks/areasAtuacaoMock.json";
import bannerMock from "@/mocks/bannerMock.json";
import CarouselDefault from "@/components/Carousel/CarouselDefault/CarouselDefault";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import ButtonLink from "@/components/Buttons/ButtonLink/ButtonLink";

type AreasAtuacaoV2Props = {
  compact?: boolean;
};

const tagSets = [
  ["Resiliencia", "Clareza", "Leveza"],
  ["Gentileza", "Equilibrio", "Evolucao"],
  ["Controle", "Forca", "Precisao"],
  ["Ritmo", "Confianca", "Mobilidade"],
  ["Conexao", "Suporte", "Conforto"],
  ["Fluidez", "Folego", "Estabilidade"],
];

const AreasAtuacaoV2: FC<AreasAtuacaoV2Props> = ({ compact = false }) => {
  const areas = areasAtuacaoMock;
  const coverImage = bannerMock?.[0]?.image || "/images/aaaa.jpg";

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleCardMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--mouse-x", "50%");
    e.currentTarget.style.setProperty("--mouse-y", "50%");
  };

  return (
    <section id="services" className={`areasAtuacaoV2 ${compact ? "areasAtuacaoV2--compact" : ""}`.trim()}>
      <div className="areasAtuacaoV2__left">
        <p className="areasAtuacaoV2__intro">
          Planos terapeuticos construidos em torno do ritmo natural de cada paciente.
        </p>

        <h2 className="areasAtuacaoV2__headline">
          <span>Cuidar do seu corpo</span>
          <br />
          dia apos dia, ciclo apos ciclo
        </h2>

        <div className="areasAtuacaoV2__cta">
          <ButtonLink
            variant="secondary"
            linkProps={{
              url: "#contact",
              name: "Escolher programa",
              title: "Escolher programa",
            }}
            iconRight="chevron-right"
          />
        </div>
      </div>

      <div className="areasAtuacaoV2__right">
        <CarouselDefault options={{ loop: false, align: "start" }} activeSlide>
          {areas.map((area, index) => (
            <article className="areasAtuacaoV2__slide" key={area.id}>
              <div
                className="areasAtuacaoV2__card"
                tabIndex={0}
                aria-label={`${area.title}. ${area.description}`}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <ImgDefault
                  src={coverImage}
                  alt={area.title}
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="areasAtuacaoV2__overlay" />

                <div className="areasAtuacaoV2__tags">
                  {(tagSets[index % tagSets.length] || []).slice(0, 2).map((tag) => (
                    <span key={tag} className="areasAtuacaoV2__tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="areasAtuacaoV2__content">
                  <h3 className="areasAtuacaoV2__title">{area.title}</h3>
                  <p className="areasAtuacaoV2__description">{area.description}</p>
                </div>
              </div>
            </article>
          ))}
        </CarouselDefault>
      </div>
    </section>
  );
};

export default AreasAtuacaoV2;
