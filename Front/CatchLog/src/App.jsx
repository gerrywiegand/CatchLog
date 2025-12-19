import { StrictMode } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import AddCatch from "./components/AddCatch.jsx";
import CatchesPage from "./components/CatchesPage.jsx";
import NavBar from "./components/Navbar.jsx";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";

function App() {
  return (
    <>
      <Container maxWidth="md">
        <Stack sx={{ textAlign: "center" }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addcatch" element={<AddCatch />} />
            <Route path="/catches" element={<CatchesPage />} />
          </Routes>
          <div>
            <h1>CatchLog App</h1>
          </div>
        </Stack>
      </Container>
    </>
  );
}
export default App;
