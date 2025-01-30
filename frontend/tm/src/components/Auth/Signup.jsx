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

  const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	  const response = await axios.post(API_BASE_URL + "/api/auth/signup", { name, email, password });
	  console.log("Signup Success:", response.data);
	  navigate("/login");
	} catch (error) {
	  console.error("Signup Error:", error.response.data); // Log detailed error
	  alert(error.response.data.error || "Signup failed! Check console.");
	}
  };
  
  return (
	<Container maxWidth="sm">
	  <Typography variant="h4">Signup</Typography>
	  <form onSubmit={handleSubmit}>
		<TextField fullWidth margin="normal" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
		<TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
		<TextField fullWidth margin="normal" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
		<Button variant="contained" color="primary" type="submit">Signup</Button>
	  </form>
	</Container>
  );
};

export default Signup;
