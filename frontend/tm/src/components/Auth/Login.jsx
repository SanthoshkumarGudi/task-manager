import { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth type="password" label="Password" onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">Login</Button>
      </form>
    </Container>
  );
};

export default Login;
