import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to validate that the email ends with @gmail.com
  const validateGmail = (email) => {
    return email.endsWith("@gmail.com");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the inputs
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (!validateGmail(email)) {
      alert("Enter a valid Gmail address ending with '@gmail.com'");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Proceed with signup if validation passes
    try {
      const response = await axios.post(API_BASE_URL + "/api/auth/signup", {
        name,
        email,
        password,
      });
      console.log("Signup Success:", response.data);
      alert("Signup Successful");
      navigate("/login"); // Redirect to the login page after successful signup
    } catch (error) {
      console.error("Signup Error:", error.response?.data); // Safely log detailed error
      alert(error.response?.data?.error || "Signup failed! Check console."); // Show error message
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Signup</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Signup
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
