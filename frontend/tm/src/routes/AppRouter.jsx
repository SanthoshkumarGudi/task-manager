import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Navbar from "../components/Layout/Navbar";
import ProtectedRoute from "../components/Layout/ProtectedRoute";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
