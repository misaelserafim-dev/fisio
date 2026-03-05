import "./Home.scss";
import { FC } from "react";
import MainDefault from "@/components/Main/Main";
import Banner from "@/modules/Banner/Banner";
import AreasAtuacao from "@/modules/AreasAtuacao/AreasAtuacao";

const Home: FC = async () => {
  return (
    <MainDefault id="home">
      <Banner />
      <AreasAtuacao />
    </MainDefault>
  );
};

export default Home;
