import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f1115",
      paper: "#1a1d24",
    },
    primary: {
      main: "#1976d2",
    },
    success: {
      main: "#2e7d32",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b3b8",
    },
  },
  typography: {
    fontSize: 15,
    h4: { fontSize: " 2rem", fontWeight: 700 },
    h5: { fontSize: "1.5rem", fontWeight: 700 },
    h6: { fontSize: "1.25rem", fontWeight: 700 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.25)",
            borderRadius: 10,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#42a5f5",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
            borderWidth: 2,
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#90caf9",
          "&.Mui-focused": {
            color: "#1976d2",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(25, 118, 210, 0.25)", // subtle blue outline
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(25, 118, 210, 0.25)",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(25, 118, 210, 0.25)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 800,
          transition: "transform 0.05s ease, box-shadow 0.15s ease",
          "&:active": {
            transform: "scale(0.98)",
          },
          "&:focus-visible": {
            boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.25)",
          },
        },
      },
    },
  },
});

export default theme;
