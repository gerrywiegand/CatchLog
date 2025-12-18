import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const created = params.get("created");
    const species = params.get("species");
    if (created === "1") {
      setOpen(true);
      setMessage(species ? `Catch created: ${species} ✅` : "Catch created ✅");
      navigate("/", { replace: true });
    }
  }, [location.search, navigate]);
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the CatchLog App!</p>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default Home;
