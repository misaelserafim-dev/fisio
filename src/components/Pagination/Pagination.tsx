"use client";
import "./Pagination.scss";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { EmblaOptionsType } from "embla-carousel";
import { paginationTranslations } from "./translations";
import PaginationDot from "./Dot";
import useResize from "@/hooks/useResize";
import useLocale from "@/hooks/useLocale";
import ArrowDirection from "./ArrowDirection";
import CarouselDefault from "../Carousel/CarouselDefault/CarouselDefault";
import CarouselSlide from "../Carousel/CarouselDefault/components/CarouselSlide";

type PaginationProps = {
  page: any;
  totalPages?: number;
} & React.ComponentProps<"section">;

const Pagination: FC<PaginationProps> = ({ page, totalPages = 1 }) => {
  const locale = useLocale();
  const router = useRouter();
  const viewport = useResize("resMd");
  const t = paginationTranslations[locale as keyof typeof paginationTranslations];

  const OPTIONS: EmblaOptionsType = {
    loop: false,
    align: "start",
    startIndex: page - (viewport ? 3 : 1),
    watchDrag: false
  };

  const handlePage = (value: number) => {
    router.push(`?page=${value.toString()}`);
  };

  return (
    <section className="pagination" data-count={totalPages}>
      <div className="pagination__container">
        <ArrowDirection
          src="/icons/arrow-2-prev.svg"
          disabled={page === 1}
          onClick={() => handlePage(1)}
          title={t.init}
          aria-disabled={page === 1 ? "true" : "false"}
        />
        <ArrowDirection
          src="/icons/arrow-1-prev.svg"
          disabled={page === 1}
          onClick={() => handlePage(Math.max(1, page - 1))}
          title={t.prev}
          aria-disabled={page === 1 ? "true" : "false"}
        />
        <CarouselDefault options={OPTIONS}>
          {Array.from({ length: totalPages }, (_: any, i) => i + 1).map((pageCurrent) => (
            <CarouselSlide key={pageCurrent}>
              <PaginationDot
                titleCurrent={t.current}
                titleLabel={t.label}
                page={pageCurrent}
                pageCurrent={page}
                onClick={() => handlePage(Number(pageCurrent))}
              />
            </CarouselSlide>
          ))}
        </CarouselDefault>
        <ArrowDirection
          src="/icons/arrow-1-next.svg"
          disabled={page === totalPages}
          onClick={() => handlePage(Math.min(totalPages, page + 1))}
          title={t.next}
          aria-disabled={page === totalPages ? "true" : "false"}
        />
        <ArrowDirection
          src="/icons/arrow-2-next.svg"
          disabled={page === totalPages}
          onClick={() => handlePage(Number(totalPages))}
          title={t.end}
          aria-disabled={page === totalPages ? "true" : "false"}
        />
      </div>
    </section>
  );
};

export default Pagination;
