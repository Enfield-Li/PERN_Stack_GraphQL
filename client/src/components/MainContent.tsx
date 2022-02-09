import React from "react";
import { usePostsQuery } from "../generated/graphql";
import Spinner from "./Spinner";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  const { data, loading } = usePostsQuery();

  return (
    <div className="container mt-3">
      {!data && loading ? (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      ) : (
        data?.posts.map((post) => (
          <div className="card mt-3" key={post.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="me-3">
                    <i className="bi bi-caret-up"></i>
                    <div>11</div>
                    <i className="bi bi-caret-down"></i>
                  </div>
                  <div>
                    <h3 className="card-title">{post.title}</h3>
                    <p className="card-text mt-2 text-muted">{post.contents}</p>
                  </div>
                </div>
                <div>edit</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default MainContent;
