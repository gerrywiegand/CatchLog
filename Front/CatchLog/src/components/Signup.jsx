import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { signup, getCurrentUser } from "../utils/api";

export default function Signup({ setUser }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await signup({ username, password });

      const meUser = await getCurrentUser();
      setUser(meUser);

      navigate("/home");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4" fontWeight={700}>
          Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}

        <Stack
          component="form"
          onSubmit={handleSubmit}
          spacing={2}
          sx={{ width: "100%" }}
        >
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            fullWidth
          />

          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="new-password"
            required
            fullWidth
          />

          <Button type="submit" variant="contained" size="large">
            Create Account
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
