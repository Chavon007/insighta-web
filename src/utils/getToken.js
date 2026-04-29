export const getAuthToken = async () => {
  const res = await fetch("/api/token", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  const data = await res.json();
  return data.token;
};
