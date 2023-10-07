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
    if(password!==confirmPassword){
      toast.error('password no match')
    }else{
      try {
        const res = await login({ name,email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        
      }
    }
  };
  return (
    <FormContainer>
      <h1>sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader></Loader>} 
        <Button type="submit" varient="primary" className="mt-3">
          sign in
        </Button>
        <Row className="py-3">
          <Col>
            Already have a account? <Link to="/login">register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default Register;
