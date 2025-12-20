import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { logout } from "../utils/api";

export default function BottomBar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  async function handleLogout() {
    await logout();
    setUser(null);
    navigate("/");
  }

  const actions = user
    ? [
        { label: "Home", value: "/home", icon: <HomeIcon /> },
        { label: "Add", value: "/addcatch", icon: <AddIcon /> },
        { label: "Catches", value: "/catches", icon: <ListIcon /> },
        { label: "Logout", value: "logout", icon: <LogoutIcon /> },
      ]
    : [
        { label: "Login", value: "/login", icon: <LoginIcon /> },
        { label: "Sign Up", value: "/signup", icon: <PersonAddIcon /> },
      ];

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={8}
    >
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => {
          if (newValue === "logout") {
            handleLogout();
            return;
          }
          setValue(newValue);
          navigate(newValue);
        }}
        showLabels
      >
        {actions.map((a) => (
          <BottomNavigationAction
            key={a.value}
            label={a.label}
            value={a.value}
            icon={a.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
