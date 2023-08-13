import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/user/${type}`, {
        name: input.name,
        email: input.email,
        password: input.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      sendRequest("signUp")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    }
  };
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* nt onClick or onChange */}
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography textAlign="center" padding={3} variant="h2">
            {isSignUp ? "SignUP" : "Login"}
          </Typography>

          {isSignUp && (
            <TextField
              name="name"
              type={"name"}
              onChange={handleChange}
              value={input.name}
              margin="normal"
              placeholder="Name"
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            value={input.email}
            type={"email"}
            margin="normal"
            placeholder="Email"
          />
          <TextField
            name="password"
            type={"password"}
            onChange={handleChange}
            value={input.password}
            margin="normal"
            placeholder="Password"
          />

          <Button
            type="submit"
            color="warning"
            variant="contained"
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignUp ? "Login" : "SignUp"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
