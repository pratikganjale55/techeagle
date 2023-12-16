import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Copyright } from "@mui/icons-material";
import "./Login.css";
import {ProductsContext} from "../../context/ContextProvider";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const { checkUser } = useContext(ProductsContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.message == "fill all the details") {
          setAlertMessage(data.message);
          setAlertSeverity("error");
        }
        if (data.message == "Invalid Credentials") {
          setAlertMessage("Invalid Credentials");
          setAlertSeverity("info");
        }

        if (data.message == "Login successful") {
          localStorage.setItem("authDetails", JSON.stringify(data.userDetails));
          setAlertMessage("Login successful.");
          setAlertSeverity("success");
          setFormData({
            name: "",
            email: "",
            password: "",
            rePassword: "",
          });

          // login()
          checkUser();
        } else {
          throw new Error("Signup failed");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
          }}
          className="outerBox"
        >
          {alertMessage && (
            <Alert severity={alertSeverity} onClose={() => setAlertMessage("")}>
              {alertMessage}
            </Alert>
          )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid>
              <Grid>
                don't have account ?{" "}
                <Link to="/signup" className="signupText">
                  Signup
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
