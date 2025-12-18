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

export const getCatches = async () => {
  try {
    const response = await fetch(`${API_BASE}/catches`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching catches:", error);
    throw error;
  }
};

export async function createCatch(catchData) {
  const res = await fetch(`${API_BASE}/catches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(catchData),
  });
  if (!res.ok) {
    let data = null;
    try {
      data = await res.json();
    } catch {
      // Ignore JSON parsing errors
    }
    const msg =
      data?.message ||
      data?.error ||
      (data?.errors ? JSON.stringify(data.errors) : null) ||
      "Request failed: ${res.status}";
    throw new Error(msg);
  }
  return await res.json();
}
