import { useState, useContext, useEffect } from "react";
import { auth } from "../App";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

import isEmpty from "lodash/isEmpty";

import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  const userAuth = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signInUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userObj = {
          email: user.email,
          uid: user.uid,
        };
        userAuth.setUser(userObj);
        sessionStorage.setItem('userData', JSON.stringify(userObj))
      })
      .catch((error) => {
        const errorWrongPassword = "auth/wrong-password";
        const errorUserNotFound = "auth/user-not-found";
        if (error.code === errorWrongPassword) {
          toast.error("Wrong password :(");
        } else if (error.code === errorUserNotFound) {
          toast.error("User does not exist :(");
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
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      signInUser();
    }
    return () => {
      isLoading;
    };
  }, [isLoading]);

  useEffect(() => {
    if (
      sessionStorage.getItem("userData") &&
      !isEmpty(sessionStorage.getItem("userData"))
    ) {
      userAuth.setUser(JSON.parse(sessionStorage.getItem("userData")));
    }
  })
  return !isEmpty(userAuth.user) ? (
    <Navigate to="/" replace />
  ) : (
    <>
      <div className="d-flex align-items-center" style={{ height: "82vh" }}>
        <Form className="col-md-6 offset-md-3 border border-primary rounded" style={{ margin: "auto" }}>
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
                id="examplePassword"
                value={password}
                placeholder="give your password"
                onChange={handlePasswordChange}
                disabled={isLoading}
              />
            </Col>
          </FormGroup>
          <div style={{ width: "20vw", margin: "auto" }}>
            <Button
              className="m-2"
              block
              color="warning"
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
                "SignIn"
              )}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SignIn;
