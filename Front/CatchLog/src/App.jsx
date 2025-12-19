import { StrictMode } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import AddCatch from "./components/AddCatch.jsx";
import CatchesPage from "./components/CatchesPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addcatch" element={<AddCatch />} />
        <Route path="/catches" element={<CatchesPage />} />
      </Routes>
      <div>
        <h1>CatchLog App</h1>
      </div>
    </>
  );
}
export default App;
