import { ListGroup, ListGroupItem, Badge } from "reactstrap";
import { repoService } from "../services/UserRepoService";
import { useState, useEffect } from "react";

const Repos = ({ repo_url }) => {
  const [repoDetails, setRepoDetails] = useState([]);
  const loadUserRepos = async () => {
    try {
      const repoResponse = await repoService(repo_url);
      setRepoDetails(repoResponse?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUserRepos();
  }, [repo_url]);
  return (
    <ListGroup>
      {repoDetails.map((repo) => (
        <ListGroupItem
          style={{
            backgroundColor: "#242B2E",
            boxShadow: "10px 12px 20px #000",
          }}
          className="justify-content-between mt-4 border border-dark rounded"
          key={repo.id}
        >
          <Badge
            color="success"
            pill
            style={{ fontSize: "1rem" }}
            className="m-2"
          >
            Repo Name : <span>{repo.name ? repo.name : "Not Available"}</span>
          </Badge>
          <div>
            <Badge
              className="m-2"
              pill
              style={{ fontSize: "1rem" }}
              color="primary"
            >
              Repo Link
            </Badge>
            <div
              onClick={() => {
                window.open(`${repo.html_url}`, "_blank");
              }}
              className="externalLink bg-dark text-white p-2 rounded mt-2 border-warning border-top border-bottom"
              style={{
                fontSize: "1rem",
                textAlign: "center",
                fontWeight: "700",
                overflow: "hidden",
              }}
            >
              {repo.html_url ? repo.html_url : "Not Available"}
            </div>
          </div>
          <Badge color="dark" pill style={{ fontSize: "1rem" }} className="m-2">
            Language used :{" "}
            <span>{repo.language ? repo.language : "Not Available"}</span>
          </Badge>
          <Badge color="dark" pill style={{ fontSize: "1rem" }} className="m-2">
            Is forking allowed? :{" "}
            <span>{repo.allow_forking ? "Yes" : "No"}</span>
          </Badge>
          <Badge
            color="danger"
            pill
            style={{ fontSize: "1rem" }}
            className="m-2"
          >
            Default Branch : <span>{repo.default_branch}</span>
          </Badge>
          <Badge color="dark" pill style={{ fontSize: "1rem" }} className="m-2">
            Repo watchers : <span>{repo.watchers}</span>
          </Badge>
          <Badge color="dark" pill style={{ fontSize: "1rem" }} className="m-2">
            Total Forks : <span>{repo.forks}</span>
          </Badge>
          <Badge color="dark" pill style={{ fontSize: "1rem" }} className="m-2">
            Total Stars : <span>{repo.stargazers_count}</span>
          </Badge>
          <Badge
            className="mt-4"
            color="secondary"
            pill
            style={{ fontSize: "1rem", width: "100%" }}
          >
            Repo Description :
          </Badge>
          <div
            className="bg-dark text-white p-2 rounded mt-2 border-primary border-top border-bottom"
            style={{
              fontSize: "1rem",
              textAlign: "center",
              fontWeight: "700",
            }}
          >
            {repo.description ? repo.description : "Not Available"}
          </div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default Repos;
