import "./AreasAtuacaoScreen.scss";
import { FC } from "react";
import MainDefault from "@/components/Main/Main";
import AreasAtuacao from "@/modules/AreasAtuacao/AreasAtuacao";

const AreasAtuacaoScreen: FC = async () => {
  return (
    <MainDefault id="areasAtuacaoPage">
      <AreasAtuacao compact />
    </MainDefault>
  );
};

export default AreasAtuacaoScreen;
