import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/loader";
import { useRegisterMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";

const Adduser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useRegisterMutation();
 
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password no match");
    } else {
      try {
        const res = await login({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/admin/manage-users");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1 style={{ fontFamily: "sans-serif" }}>Add New User</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader></Loader>}
        <Button type="submit" varient="primary" className="mt-3">
       Add
        </Button>
       
      </Form>
    </FormContainer>
  );
};

export default Adduser;
