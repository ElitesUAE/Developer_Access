// src/utils/blogHelpers.js
export const toDDMMYYYY = (d) => {
  const dateObj = new Date(d);
  if (Number.isNaN(dateObj.getTime())) return null;
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const yyyy = dateObj.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

export const normalizeTags = (input) => {
  if (!input) return [];
  if (Array.isArray(input))
    return input.map((t) => String(t).trim()).filter(Boolean);
  return String(input)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
};
