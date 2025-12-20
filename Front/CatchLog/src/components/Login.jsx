import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { login, getCurrentUser } from "../utils/api"; // adjust path if needed

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      // Login sets the session cookie
      await login({ username, password });

      // Then fetch /me so we store the canonical user object
      const meUser = await getCurrentUser();
      setUser(meUser);

      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4" fontWeight={700}>
          Login
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
            autoComplete="current-password"
            required
            fullWidth
          />

          <Button type="submit" variant="contained" size="large">
            Log In
          </Button>

          <Typography variant="body2" textAlign="center">
            No account?{" "}
            <Typography
              component={RouterLink}
              to="/signup"
              sx={{ textDecoration: "none" }}
            >
              Sign up
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
