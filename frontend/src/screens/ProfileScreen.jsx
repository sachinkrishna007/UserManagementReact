import { useState, useEffect } from "react";
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { PROFILE_IMAGE_DIR_PATH} from '../utils/constants'
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState();
const navigate = useNavigate()
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  console.log({userInfo});

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
   
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profileImage", profileImage);
        console.log(profileImage);

        const responseFromApiCall = await updateProfile(formData).unwrap();

        dispatch(setCredentials({ ...responseFromApiCall }));

        toast.success("Profile updated successfully");
        navigate('/')
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }

  };
  return (
    <FormContainer>
      
      {userInfo.profileImageName && (
        <img
          src={PROFILE_IMAGE_DIR_PATH + userInfo.profileImageName}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            marginTop: "5px",
            marginLeft: "115px",
            marginBottom: "10px",
          }}
        />
      )}
      <h3
        style={{
          display: "block",
          marginTop: "5px",
          marginLeft: "100px",
          marginBottom: "5px",
        }}
      >
        Update Profile
      </h3>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
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
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="profileImage">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
    
  );
};

export default ProfileScreen;
