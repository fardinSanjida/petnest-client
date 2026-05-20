export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export function formatDate(date) {
  if (!date) return "Not set";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(date));
}
