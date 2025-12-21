import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCatch, getSpecies } from "../utils/api";
import Spinner from "../utils/Spinner";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import theme from "../styles/theme.js";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

function AddCatch({ user }) {
  if (!user) {
    return <Typography variant="h6">Please log in to add a catch.</Typography>;
  }
  const [species, setSpecies] = useState([]);
  const [selectedSpeciesID, setSelectedSpeciesID] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [submitError, setSubmitError] = useState(null);
  const [lure, setLure] = useState("");
  const navigate = useNavigate();
  const canSubmit = selectedSpeciesID && weight && length ? true : false; // Simple validation

  const selectedSpecies =
    species.find((s) => s.id === selectedSpeciesID) || null;

  useEffect(() => {
    async function fetchSpecies() {
      setError(null);
      setLoading(true);
      try {
        const data = await getSpecies();
        setSpecies(data);
      } catch (err) {
        setError("Failed to fetch species");
      } finally {
        setLoading(false);
      }
    }
    fetchSpecies();
  }, []);

  return (
    <div>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <h1>Add Catch Page</h1>
        <p>Add Catch page working!</p>
        <div>{loading && <Spinner />}</div>
        <Autocomplete
          options={species}
          getOptionLabel={(option) => option.name}
          value={selectedSpecies}
          onChange={(event, newValue) => {
            setSelectedSpeciesID(newValue ? newValue.id : "");
          }}
          renderInput={(params) => <TextField {...params} label="Species" />}
        />
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Weight (lbs)"
                type="number"
                fullWidth
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Length (in)"
                type="number"
                fullWidth
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Lure (optional)"
                fullWidth
                value={lure}
                onChange={(e) => setLure(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>

        <Button
          color="success"
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 3, py: 1.7 }}
          disabled={!canSubmit || loading}
          onClick={async () => {
            const catchData = {
              species_id: selectedSpeciesID,
              weight: parseFloat(weight),
              length: parseFloat(length),
              lure: lure.trim() ? lure.trim() : null,
            };
            setLoading(true);
            setSubmitError(null);
            console.log("Submitting catch data:", catchData);
            try {
              await createCatch(catchData);
              console.log("Catch created successfully");
              navigate("/?created=1");
            } catch (error) {
              console.error("Error creating catch:", error);
              setSubmitError("Failed to create catch");
            } finally {
              setLoading(false);
            }
          }}
        >
          Submit
        </Button>
      </Container>
    </div>
  );
}
export default AddCatch;
