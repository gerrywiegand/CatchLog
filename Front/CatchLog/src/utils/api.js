const API_BASE = "http://localhost:5000";
// keeps API calls in one place for easier maintenance

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }
  return data;
}

export const getSpecies = () => apiFetch("/species");
export const getSpeciesById = (id) => apiFetch(`/species/${id}`);
export const createSpecies = (payload) =>
  apiFetch("/species", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getCatches = async ({ page = 1, perPage = 5 } = {}) => {
  const qs = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });
  const data = await apiFetch(`/catches?${qs.toString()}`);

  return Array.isArray(data) ? data : data?.items ?? [];
};
export const getCatchById = async (id) => apiFetch(`/catches/${id}`);

export const createCatch = async (catchData) =>
  apiFetch("/catches", {
    method: "POST",
    body: JSON.stringify(catchData),
  });

export const signup = (payload) =>
  apiFetch("/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const login = (payload) =>
  apiFetch("/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const logout = () =>
  apiFetch("/logout", {
    method: "POST",
  });

export const getCurrentUser = () => apiFetch("/me");

export const deleteCatch = (id) =>
  apiFetch(`/catches/${id}`, {
    method: "DELETE",
  });

export const updateCatch = (id, catchData) =>
  apiFetch(`/catches/${id}`, {
    method: "PATCH",
    body: JSON.stringify(catchData),
  });
