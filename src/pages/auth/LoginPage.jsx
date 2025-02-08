import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0 0 10px 10px rgba(98, 98, 98, 0.25)",
        }}
      >
        <Grid container spacing={0}>
          <Grid size={8}>
            <Box sx={{display:"flex", flexDirection:"column"}}>
              <TextField size="small"></TextField>

              <TextField size="small"></TextField>
              <Button>Log In</Button>
            </Box>
          </Grid>

          <Grid size={4}>
            <Box sx={{ backgroundColor: "black", width: "100%", height:"100%" }}>
              <img src="" alt="" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default LoginPage;
