import React from "react";
import LayoutSpinner from "../../components/LayoutSpinner";
import LayoutWrapper from "../../components/LayoutWrapper";
import { useProfileQuery } from "../../generated/graphql";
import withApollo from "../../utils/withApollo";

const Profile: React.FC = ({}) => {
  const { data, loading, error } = useProfileQuery();

  if (loading) return <LayoutSpinner />;
  if (error) return <LayoutWrapper>Something went wrong</LayoutWrapper>;

  return (
    <div>
      <div>{data?.me?.username}</div>
    </div>
  );
};

export default withApollo({ ssr: false })(Profile);
