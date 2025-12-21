import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CatchCards from "./CatchCards.jsx";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCatch, updateCatch } from "../utils/api";

function CatchTable({
  catches = [],
  speciesMap = {},
  speciesList = [],
  onRefresh,
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeCatch, setActiveCatch] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    species_id: "",
    weight: "",
    length: "",
    lure: "",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  function openEdit(c) {
    setActiveCatch(c);
    setForm({
      species_id: c.species_id != null ? String(c.species_id) : "",
      weight: c.weight ?? "",
      length: c.length ?? "",
      lure: c.lure ?? "",
    });
    setEditOpen(true);
  }

  function openDelete(c) {
    setActiveCatch(c);
    setDeleteOpen(true);
  }

  async function handleSaveEdit() {
    if (!activeCatch) return;

    setSaving(true);
    try {
      await updateCatch(activeCatch.id, {
        species_id: Number(form.species_id),
        weight: Number(form.weight),
        length: Number(form.length),
        lure: form.lure.trim() || null,
      });

      setEditOpen(false);
      setActiveCatch(null);
      await onRefresh?.();
    } finally {
      setSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!activeCatch) return;

    setSaving(true);
    try {
      await deleteCatch(activeCatch.id);
      setDeleteOpen(false);
      setActiveCatch(null);
      await onRefresh?.();
    } finally {
      setSaving(false);
    }
  }
  if (isMobile) {
    // Show cards on mobile
    return (
      <CatchCards
        catches={catches}
        speciesMap={speciesMap}
        onEdit={openEdit}
        onDelete={openDelete}
      />
    );
  }

  return (
    // Show table on desktop
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="catch table">
          <TableHead>
            <TableRow>
              <TableCell>Catch ID</TableCell>
              <TableCell>Species</TableCell>
              <TableCell align="right">Weight (lbs)</TableCell>
              <TableCell align="right">Length (inches)</TableCell>
              <TableCell align="right">Lure Used</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {catches.map((catchObj) => (
              <TableRow
                key={catchObj.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {catchObj.id}
                </TableCell>

                <TableCell>
                  {speciesMap[catchObj.species_id] || "Unknown"}
                </TableCell>

                <TableCell align="right">{catchObj.weight}</TableCell>

                <TableCell align="right">{catchObj.length}</TableCell>

                <TableCell align="right">{catchObj.lure || "-"}</TableCell>

                <TableCell>
                  {catchObj.date_caught
                    ? new Date(catchObj.date_caught).toLocaleString()
                    : ""}
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    onClick={() => openEdit(catchObj)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => openDelete(catchObj)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Catch</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {speciesList.length > 0 && (
              <TextField
                select
                label="Species"
                value={form.species_id}
                onChange={(e) =>
                  setForm((f) => ({ ...f, species_id: e.target.value }))
                }
                fullWidth
              >
                {speciesList.map((s) => (
                  <MenuItem key={s.id} value={String(s.id)}>
                    {s.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <TextField
              label="Weight (lbs)"
              type="number"
              value={form.weight}
              onChange={(e) =>
                setForm((f) => ({ ...f, weight: e.target.value }))
              }
              fullWidth
            />

            <TextField
              label="Length (in)"
              type="number"
              value={form.length}
              onChange={(e) =>
                setForm((f) => ({ ...f, length: e.target.value }))
              }
              fullWidth
            />

            <TextField
              label="Lure (optional)"
              value={form.lure}
              onChange={(e) => setForm((f) => ({ ...f, lure: e.target.value }))}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)} disabled={saving}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            variant="contained"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete Catch?</DialogTitle>
        <DialogContent>This cannot be undone.</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)} disabled={saving}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={saving}
          >
            {saving ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CatchTable;
