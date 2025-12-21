import { StrictMode, useState, useEffect } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import AddCatch from "./components/AddCatch.jsx";
import CatchesPage from "./components/CatchesPage.jsx";
import NavBar from "./components/Navbar.jsx";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import { getCurrentUser } from "./utils/api.js";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Landing from "./components/Landing.jsx";
import BottomBar from "./components/BottomBar.jsx";
import SpeciesPage from "./components/SpeciesPage.jsx";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);
  return (
    <>
      <Container maxWidth="md">
        <Stack sx={{ textAlign: "center", pb: 10 }}>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Landing user={user} />} />
            <Route path="/home" element={<Home user={user} />} />
            <Route path="/addcatch" element={<AddCatch user={user} />} />
            <Route path="/catches" element={<CatchesPage user={user} />} />
            <Route path="/species" element={<SpeciesPage />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
          </Routes>
          <BottomBar user={user} setUser={setUser} />
        </Stack>
      </Container>
    </>
  );
}
export default App;
