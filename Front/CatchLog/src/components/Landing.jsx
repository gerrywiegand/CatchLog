import { Navigate, Link as RouterLink } from "react-router-dom";
import { Container, Stack, Typography, Button } from "@mui/material";

export default function Landing({ user }) {
  // If already logged in, skip landing
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Stack spacing={4} alignItems="center">
        <Typography variant="h3" fontWeight={700}>
          CatchLog
        </Typography>

        <Typography variant="body1" textAlign="center">
          Log your catches. Track your progress. Fish smarter.
        </Typography>

        <Stack spacing={2} width="100%">
          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            size="large"
            fullWidth
          >
            Log In
          </Button>

          <Button
            component={RouterLink}
            to="/signup"
            variant="outlined"
            size="large"
            fullWidth
          >
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
