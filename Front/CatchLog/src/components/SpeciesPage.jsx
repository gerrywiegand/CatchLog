import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Spinner from "../utils/Spinner";
import { getSpecies, createSpecies } from "../utils/api";

export default function SpeciesPage() {
  const navigate = useNavigate();

  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = name.trim() && description.trim() && !saving;

  async function loadSpecies() {
    setLoading(true);
    setError("");
    try {
      const data = await getSpecies();
      setSpecies(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
      setError(err.message || "Failed to load species");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSpecies();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        name: name.trim(),
        description: description.trim(),
      };

      if (!payload.name || !payload.description) {
        setError("Name and description are required.");
        return;
      }

      await createSpecies(payload);

      // reset form
      setName("");
      setDescription("");

      // refresh list
      await loadSpecies();
    } catch (err) {
      if (err.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
      setError(err.message || "Failed to add species");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4" fontWeight={700}>
          Species
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 2, width: "100%" }}>
          <Stack component="form" onSubmit={handleAdd} spacing={2}>
            <Typography variant="h6">Add Species</Typography>

            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
              multiline
              minRows={2}
            />

            <Button
              color="success"
              type="submit"
              variant="contained"
              size="large"
              disabled={!canSubmit || saving}
            >
              {saving ? "Adding..." : "Add Species"}
            </Button>
          </Stack>
        </Paper>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            All Species
          </Typography>

          {loading ? (
            <Stack sx={{ p: 2 }}>
              <Spinner />
            </Stack>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="25%">Name</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {species.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.description}</TableCell>
                  </TableRow>
                ))}
                {species.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="body2">No species yet.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Stack>
    </Container>
  );
}
