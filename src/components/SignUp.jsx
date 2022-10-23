import { useState, useContext, useEffect } from "react";
import { auth } from "../App";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import UserContext  from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";

import isEmpty from "lodash/isEmpty";

import { toast } from "react-toastify";

const SignUp = () => {

    const navigate = useNavigate()
  const userAuth = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signUpUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        toast.success('Usre has been registered in successfully, please sign in to continue')
       navigate('/signin')
      })
      .catch((error) => {
        const errCode = "auth/email-already-in-use"
        if (error.code === errCode) {
            toast.error('user already exists');
        } else {
            toast.error(error.message);
        }
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("email or password is required");
      return;
    }
    setIsLoading(true)
  };

  useEffect(() => {
      if (isLoading) {
        signUpUser();
      }
      return () => {
        isLoading
      };
  }, [isLoading])
        return !isEmpty(userAuth.user) ? (
          <Navigate to="/" replace />
        ) : (
          <>
            <div
              className="d-flex align-items-center "
              style={{ height: "82vh" }}
            >
              <Form
                className="col-md-6 offset-md-3 border border-primary rounded"
                style={{ margin: "auto" }}
              >
                <FormGroup row className="p-4">
                  <Label for="exampleEmail" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      value={email}
                      placeholder="example@gmail.com"
                      onChange={handleEmailChange}
                      disabled={isLoading}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="px-4">
                  <Label for="examplePassword" sm={2}>
                    Password
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      id="examplePassword"
                      placeholder="give your password"
                      onChange={handlePasswordChange}
                      disabled={isLoading}
                    />
                  </Col>
                </FormGroup>
                <div style={{ width: "10rem", margin: "auto" }}>
                  <Button
                    className="m-2"
                    block
                    color="success"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner
                        color="danger"
                        size="sm"
                        style={{ marginLeft: "1rem", marginRight: "1rem" }}
                      />
                    ) : (
                      "Register User"
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </>
        );
        
}

export default SignUp;
