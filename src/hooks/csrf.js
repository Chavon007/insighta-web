function useCsrf() {
  const API_URL = "https://identity-profile-api-service.vercel.app";

  const getCsrfToken = async () => {
    const res = await fetch(`${API_URL}/auth/csrf-token`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to get CSRF token");

    const data = await res.json();
    return data.csrfToken;
  };

  return { getCsrfToken };
}

export default useCsrf;
