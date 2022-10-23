import { useState, useContext, useEffect} from 'react'
import userContext from '../context/UserContext'
import { profileService } from "../services/UserProfileService";
import {isEmpty} from 'lodash'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";

import Profile from './Profile'
import Repos from './Repos'



const Dashboard = () => {


    const navigate = useNavigate()
 const [gitHubUser, setGitHubUser] = useState({});
 const [repoUrl, setRepoUrl] = useState(null);
 const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 const auth = useContext(userContext);

  const fetchGitHubUser = async(userName) => {
    try {
        const userResponse = await profileService(userName);
        setGitHubUser(userResponse?.data)

    } catch (err) {
        if (err.code === "ERR_BAD_REQUEST"){
            toast.error('user not found! Try searching with another username')
        } console.log(err);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  const handleUsernameChange = (e) => {
    setUserName(e.target.value)
  }

  useEffect(() => {
    if (isEmpty(auth.user)) navigate('/signin')
  }, []);

  useEffect(() => {
    setRepoUrl(gitHubUser.repos_url ? gitHubUser.repos_url : null);
  }, [gitHubUser])

  useEffect(() => {
    if (isLoading) {
        setGitHubUser({})
        fetchGitHubUser(userName);
    };
  }, [isLoading])

  return (
    <>
      {
        !isEmpty(auth.user) ? <Container
          style={{
            minHeight: "30vh",
            marginBottom: '6rem'
          }}
        >
          <Row className="mt-5 p-2">
            <Form className="col-md-6 offset-md-3 border border-primary rounded" style={{margin: 'auto'}}>
              <FormGroup row className="p-4">
                <Label for="exampleEmail">Github Username</Label>
                <Col>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    value={userName}
                    placeholder="For Ex. type isaroj or nayak-nirmalya"
                    onChange={handleUsernameChange}
                    disabled={isLoading}
                  />
                </Col>
              </FormGroup>
              <div className="text-center">
                <Button
                  color="warning"
                  onClick={() => {
                    if (userName === '') toast.error('why are you searching without typing anything :( please give any valid github username')
                    else setIsLoading(true)
                  }}
                  disabled={isLoading}
                  block
                  className="mb-2"
                >
                  {isLoading ? (
                    <Spinner
                      color="danger"
                      size="sm"
                      style={{ marginLeft: "1rem", marginRight: "1rem" }}
                    />
                  ) : (
                    "Find User"
                  )}
                </Button>
              </div>
            </Form>
          </Row>
        <Row className="mt-4 mb-4">
          {
            isLoading ? (
                    <><Spinner
                                  color="danger"
                                  size="sm"
                                  className="mt-4"
                                  style={{ margin: 'auto', minHeight: "2rem", minWidth: "2rem" }} /><span className="text-center display-6">Fetching user from github....</span></>
                  ) : 
                    !isEmpty(gitHubUser) ? (
                    <>
                        <Col md={4}>
                <div
                  style={{
                    position: "sticky",
                    top: "5vh",
                  }}
                >
                  <Profile user={gitHubUser} />
                </div>
              </Col>
              <Col md={8}>
                <Repos repo_url={repoUrl} />
              </Col>
                    </>
          ) : (
            ""
          )
                  
          }
        </Row>
        </Container> : ''
      }
    </>
  );
};

export default Dashboard;
