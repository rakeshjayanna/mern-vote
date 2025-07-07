import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the College Voting App
      </Typography>
      <Typography variant="h6" gutterBottom>
        Vote in polls or create new ones if you're an admin!
      </Typography>
      {user ? (
        <Button variant="contained" color="primary" component={Link} to="/dashboard">
          Go to Dashboard
        </Button>
      ) : (
        <>
          <Button variant="contained" component={Link} to="/login" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button variant="outlined" component={Link} to="/register">
            Register
          </Button>
        </>
      )}
    </Container>
  );
};

export default Home;
