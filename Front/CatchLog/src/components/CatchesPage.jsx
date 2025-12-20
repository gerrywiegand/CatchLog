import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { getCatches, getSpecies } from "../utils/api";
import CatchTable from "./CatchTable";
import Spinner from "../utils/Spinner";
import Container from "@mui/material/Container";

function CatchesPage() {
  if (!user) {
    return (
      <Typography variant="h6">Please log in to view your catches.</Typography>
    );
  }
  const [speciesMap, setSpeciesMap] = useState({});
  const [catches, setCatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      <h1>Catches Page</h1>
      <p>View all your logged catches below.</p>
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        {loading && <Spinner />}
        {error && <Alert severity="error">{error}</Alert>}
        {catches.length === 0 &&
          !loading &&
          !error && ( // No catches logged yet
            <Typography variant="h6">
              Log your first catch to get started!
            </Typography>
          )}
        {!loading && !error && catches.length > 0 && (
          <CatchTable catches={catches} speciesMap={speciesMap} />
        )}
      </Container>
    </div>
  );
}
export default CatchesPage;
