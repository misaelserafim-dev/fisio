import "./Home.scss";
import { FC } from "react";
import MainDefault from "@/components/Main/Main";
import Banner from "@/modules/Banner/Banner";
import AtendimentoCasa from "@/modules/AtendimentoCasa/AtendimentoCasa";
import AreasAtuacao from "@/modules/AreasAtuacao/AreasAtuacao";
import ProcessoCuidado from "@/modules/ProcessoCuidado/ProcessoCuidado";

const Home: FC = async () => {
  return (
    <MainDefault id="home">
      <Banner />
      <AreasAtuacao variant="v2" />
      <ProcessoCuidado />
      <AtendimentoCasa />
    </MainDefault>
  );
};

export default Home;
