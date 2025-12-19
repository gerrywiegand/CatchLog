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
import { Container } from "@mui/material";

function AddCatch() {
  const [species, setSpecies] = useState([]);
  const [selectedSpeciesID, setSelectedSpeciesID] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [submitError, setSubmitError] = useState(null);
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
        <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
          <TextField
            label="Weight(lbs)"
            type="number"
            slotProps={{ htmlInput: { min: 0.1, max: 500, step: 0.1 } }}
            size="small"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <TextField
            label="Length(in)"
            type="number"
            slotProps={{ htmlInput: { min: 0.1, max: 300, step: 0.1 } }}
            value={length}
            size="small"
            onChange={(e) => setLength(e.target.value)}
          />
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
            };
            setLoading(true);
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
