import { useEffect } from "react";
import React, { useState },{useEffect} from "react";
import { getSpecies } from "../utils/api";
import Spinner from "../utils/spinner";
function AddCatch() {
  const [species, setSpecies] = useState([]);
  const [speciesID, setSpeciesID] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  function handleLoading() {
    if (loading) {
      return <Spinner />;
    }
  }

  
  getSpecies(){
    setLoading(true);
    setError(null);
    try {
      const data = await getSpecies();
      setSpecies(data);
    } catch (err) {
      setError("Failed to fetch species");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <h1>Add Catch Page</h1>
      <p>Add Catch page working!</p>
    </div>
  );
}}
export default AddCatch;
