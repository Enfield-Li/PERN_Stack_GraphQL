import type { NextPage } from "next";
import LayoutWrapper from "../components/LayoutWrapper";
import MainContent from "../components/MainContent";
import withApollo from "../utils/withApollo";

const Home: NextPage = () => {
  return (
    <LayoutWrapper>
      <MainContent />
    </LayoutWrapper>
  );
};

export default withApollo({ ssr: true })(Home);
