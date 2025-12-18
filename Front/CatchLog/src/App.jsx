import { StrictMode } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./componenets/Home.jsx";
import AddCatch from "./componenets/AddCatch.jsx";

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-catch" element={<AddCatch />} />
      </Routes>
      <div>
        <h1>CatchLog App</h1>
      </div>
    </>
  );
}
export default App;
