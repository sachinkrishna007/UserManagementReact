import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAdminloginMutation } from "../../slices/adminApiSlice";
import { setCredentials } from "../../slices/adminAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";

const loginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useAdminloginMutation()
  const { adminInfo } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin");
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const responseFromApiCall = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...responseFromApiCall }));

      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <FormContainer className="background">
      <h1>Admin Sign in</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          {" "}
          Sign In{" "}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default loginScreen;
