import { API_BASE } from "../utils/config";

export const getSpecies = async () => {
  try {
    const response = await fetch(`${API_BASE}/species`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};
