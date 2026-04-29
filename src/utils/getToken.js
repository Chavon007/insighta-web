export const getAuthToken = async () => {
  const res = await fetch("/api/token");
  if (!res.ok) throw new Error("Not authenticated");
  const data = await res.json();
  return data.token;
};
