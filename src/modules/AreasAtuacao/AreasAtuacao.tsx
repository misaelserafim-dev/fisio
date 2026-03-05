import "./AreasAtuacao.scss";
import { FC } from "react";
import areasAtuacaoMock from "@/mocks/areasAtuacaoMock.json";
import bannerMock from "@/mocks/bannerMock.json";
import ButtonLink from "@/components/Buttons/ButtonLink/ButtonLink";
import CarouselDefault from "@/components/Carousel/CarouselDefault/CarouselDefault";
import ImgDefault from "@/components/ImgDefault/ImgDefault";

type AreasAtuacaoProps = {
  compact?: boolean;
};

const AreasAtuacao: FC<AreasAtuacaoProps> = ({ compact = false }) => {
  const areas = areasAtuacaoMock;
  const coverImage = bannerMock?.[0]?.image || "/images/aaaa.jpg";

  return (
    <section id="services" className={`areasAtuacao ${compact ? "areasAtuacao--compact" : ""}`.trim()}>
      <div className="areasAtuacao__header">
        <div className="areasAtuacao__headerLeft">
          <p className="areasAtuacao__eyebrow">Especialidades</p>
        </div>

        <div className="areasAtuacao__headerRight">
          <h2 className="areasAtuacao__title">Areas de atuacao da clinica</h2>
          <p className="areasAtuacao__description">
            Atendimento humanizado com plano terapeutico individual para cada fase da reabilitacao.
          </p>
        </div>
      </div>

      <div className="areasAtuacao__carouselWrap">
        <CarouselDefault options={{ loop: true, align: "start" }} activeSlide>
          {areas.map((area, index) => (
            <article className="areasAtuacao__slide" key={area.id}>
              <div className="areasAtuacao__card">
                <div className="areasAtuacao__media">
                  <ImgDefault
                    src={coverImage}
                    alt={area.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="areasAtuacao__mediaOverlay" />
                  <h3 className="areasAtuacao__cardTitle">{area.title}</h3>
                </div>

                <p className="areasAtuacao__cardDescription">{area.description}</p>
              </div>
            </article>
          ))}
        </CarouselDefault>
      </div>

      {!compact && (
        <div className="areasAtuacao__cta">
          <ButtonLink
            variant="secondary"
            linkProps={{
              url: "#contact",
              name: "Agendar avaliacao",
              title: "Agendar avaliacao",
            }}
            iconRight="chevron-right"
          />
        </div>
      )}
    </section>
  );
};

export default AreasAtuacao;
