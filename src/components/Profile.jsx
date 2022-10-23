import {
  Card, CardImg, CardBody, CardSubtitle, Badge
} from 'reactstrap';

const Profile = ({user}) => {
    return (
      <div>
        <Card
          style={{
            backgroundColor: "#242B2E",
          }}
        >
          <CardImg
            top
            style={{
              width: "20rem",
              height: "20rem",
              objectFit: "cover",
              margin: "1rem auto",
            }}
            src={user.avatar_url}
            alt="profile pic"
            className="img-thumbnail"
          />
          <CardBody>
            <CardSubtitle
              tag="h6"
              className="pb-3 d-flex justify-content-between"
            >
              <Badge color="primary" pill style={{ fontSize: "1rem" }}>
                Name :
              </Badge>
              <Badge color="dark" style={{ fontSize: "1rem" }}>
                {user.name}
              </Badge>
            </CardSubtitle>
            <CardSubtitle
              tag="h6"
              className="pb-3 d-flex justify-content-between"
            >
              <Badge color="primary" pill style={{ fontSize: "1rem" }}>
                Email :
              </Badge>
              <Badge color="dark" style={{ fontSize: "1rem" }}>
                {user.email ? user.email : "Not Available"}
              </Badge>
            </CardSubtitle>
            <CardSubtitle
              tag="h6"
              className="pb-3 d-flex justify-content-between"
            >
              <Badge color="primary" pill style={{ fontSize: "1rem" }}>
                Location :
              </Badge>
              <Badge color="dark" style={{ fontSize: "1rem" }}>
                {user.location ? user.location : "Not Available"}
              </Badge>
            </CardSubtitle>
            <CardSubtitle
              tag="h6"
              className="pb-3 d-flex justify-content-between"
            >
              <Badge color="primary" pill style={{ fontSize: "1rem" }}>
                Following :
              </Badge>
              <Badge color="dark" style={{ fontSize: "1rem" }}>
                {user.following ? user.following : "Not Available"}
              </Badge>
            </CardSubtitle>
            <CardSubtitle
              tag="h6"
              className="pb-3 d-flex justify-content-between"
            >
              <Badge color="primary" pill style={{ fontSize: "1rem" }}>
                Followers :
              </Badge>
              <Badge color="dark" style={{ fontSize: "1rem" }}>
                {user.followers ? user.followers : "Not Available"}
              </Badge>
            </CardSubtitle>
            <CardSubtitle
              tag="h6"
              className="pb-3 d-flex justify-content-between"
            >
              <Badge color="primary" pill style={{ fontSize: "1rem" }}>
                Public Repos :
              </Badge>
              <Badge color="dark" style={{ fontSize: "1rem" }}>
                {user.public_repos ? user.public_repos : "Not Available"}
              </Badge>
            </CardSubtitle>
            <CardSubtitle
              tag="h6"
              className="pb-3 d-flex justify-content-between"
            >
              <Badge color="primary" pill style={{ fontSize: "1rem" }}>
                Ready to hire :
              </Badge>
              <Badge color="dark" style={{ fontSize: "1rem" }}>
                {user.hireable ? user.hireable : "Not Available"}
              </Badge>
            </CardSubtitle>
            <div className="text-center mt-4">
              <Badge
                color="success"
                pill
                style={{ fontSize: "1rem", width: "100%" }}
              >
                Bio :
              </Badge>
              <div
                className="bg-dark text-white p-2 rounded mt-2 border-warning border-top border-bottom"
                style={{
                  fontSize: "1rem",
                  textAlign: "center",
                  fontWeight: "700",
                }}
              >
                {user.bio ? user.bio : "Not Available"}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
}

export default Profile