import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { getCatches, getSpecies } from "../utils/api";
import CatchTable from "./CatchTable";
import Spinner from "../utils/Spinner";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [speciesMap, setSpeciesMap] = useState({});
  const [catches, setCatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [speciesData, catchesData] = await Promise.all([
          getSpecies(),
          getCatches(),
        ]);
        const sorted = catchesData.sort(
          (a, b) => new Date(b.date_caught) - new Date(a.date_caught)
        );
        const speciesMapTemp = {};
        speciesData.forEach((s) => {
          speciesMapTemp[s.id] = s.name;
        });
        setSpeciesMap(speciesMapTemp);
        setCatches(sorted);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
      {loading && <Spinner />}
      {error && <Alert severity="error">{error}</Alert>}
      {catches.length === 0 && !loading && !error && (
        <Typography variants="h6">
          Log your first catch to get started!
        </Typography>
      )}
      {!loading && !error && catches.length > 0 && (
        <CatchTable catches={catches} speciesMap={speciesMap} />
      )}
    </div>
  );
}
export default Home;
