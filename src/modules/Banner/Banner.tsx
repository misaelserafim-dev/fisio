import "./Banner.scss";
import { FC } from "react";
import bannerMock from "@/mocks/bannerMock.json";
import CarouselDefault from "@/components/Carousel/CarouselDefault/CarouselDefault";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import ButtonLink from "@/components/Buttons/ButtonLink/ButtonLink";

const Banner: FC = () => {
  return (
    <section id="banner" className="banner">
      <CarouselDefault options={{ loop: true }} activeSlide>
        {bannerMock.map((item, index) => (
          <div key={item.id} className="banner__slide">

            {/* IMAGEM FULL OTIMIZADA */}
            <div className="banner__background">
              <ImgDefault
                src={item.image}
                alt={item.title}
                fill
                priority={index === 0} // Só a primeira imagem é prioridade
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            {item.overlay && <div className="banner__overlay" />}

            <div className="banner__container">
              <div className="banner__carousel">
                <div className="banner__carousel_container">

                  <h1 className="banner__title" dangerouslySetInnerHTML={{ __html: item.title }} />
                  <p className="banner__description"  dangerouslySetInnerHTML={{ __html: item.description }} />

                  {item.buttonText && (
                    <ButtonLink
                      variant="secondary"
                      linkProps={{
                        url: item.buttonLink,
                        name: item.buttonText,
                        title: item.buttonText
                      }}
                      iconRight="chevron-right"
                    />
                  )}

                </div>
              </div>
            </div>

          </div>
        ))}
      </CarouselDefault>
    </section>
  );
};

export default Banner;