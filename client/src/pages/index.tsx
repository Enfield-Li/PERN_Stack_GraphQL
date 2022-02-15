import type { NextPage } from "next";
import LayoutWrapper from "../components/LayoutWrapper";
import MainContent from "../components/MainContent";
import PlaceHolder from "../components/PlaceHolder";

const Home: NextPage = () => {
  return (
    <LayoutWrapper>
      <MainContent />
    </LayoutWrapper>
  );
};

export default Home;
