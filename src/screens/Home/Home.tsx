import "./Home.scss";
import { FC } from "react";
import MainDefault from "@/components/Main/Main";
import StructureData from "@/components/SEO/StructureData/StructureData";
import Banner from "@/modules/Banner/Banner";


const Home: FC = async () => {
  return (
    <MainDefault id="home">
      {/* <StructureData data={data?.acf?.metaDados} /> */}
      <Banner />
    </MainDefault>
  );
};

export default Home;
