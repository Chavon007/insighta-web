import useCsrf from "@/hooks/csrf";
function useAuth() {
  const API_URL = "https://identity-profile-api-service.vercel.app";
  const { getCsrfToken } = useCsrf();

  const login = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  const logout = async () => {
    const csrfToken = await getCsrfToken();
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "x-csrf-token": csrfToken,
      },
    });
  };

  return { login, logout };
}

export default useAuth;
