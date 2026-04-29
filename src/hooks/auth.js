function useAuth() {
  const API_URL = "https://identity-profile-api-service.vercel.app";

  const login = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  };

  return { login, logout };
}

export default useAuth;
