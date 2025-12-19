import { StrictMode } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import AddCatch from "./components/AddCatch.jsx";
import CatchTable from "./components/CatchTable.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addcatch" element={<AddCatch />} />
        <Route path="/table" element={<CatchTable />} />
      </Routes>
      <div>
        <h1>CatchLog App</h1>
      </div>
    </>
  );
}
export default App;
