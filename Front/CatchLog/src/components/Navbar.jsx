import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import React from "react";

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="sticky" elevation="1">
      <Toolbar>
        <Container maxWidth="med" sx={{ px: 0 }}>
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={isMobile ? 1 : 2}
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%", py: isMobile ? 1 : 0 }}
          >
            {[
              { label: "Home", to: "/" },
              { label: "Add Catch", to: "/addcatch" },
              { label: "View Catches", to: "/catches" },
            ].map((item) => (
              <Button
                key={item.to}
                color="inherit"
                component={RouterLink}
                to={item.to}
                variant="contained"
                size="large"
                fullWidth={isMobile}
                sx={{
                  py: isMobile ? 1.5 : 1,
                  fontSize: isMobile ? "1.2rem" : "1rem",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
