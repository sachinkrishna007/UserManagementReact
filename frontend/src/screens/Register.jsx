import { useState,useEffect } from "react";
import { Link,useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [login, { isLoading }] = useRegisterMutation();
     useEffect(() => {
       if (userInfo) {
         navigate("/");
       }
     }, [navigate, userInfo]);
 
 const submitHandler = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
  } else if (email === '' || name === '' || password === '' || confirmPassword === '') {
    if (email === '') toast.error('Email is required');
    if (name === '') toast.error('Name is required');
    if (password === '') toast.error('Password is required');
    if (confirmPassword === '') toast.error('Confirm Password is required');
  } else {
    try {
      const res = await login({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
};

  return (
    <FormContainer>
      <h1 style={{fontFamily:"sans-serif"}}>Sign Up</h1>
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
          Register
        </Button>
        <Row className="py-3">
          <Col>
            Already have a account? <Link to="/login">sign in</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default Register;
