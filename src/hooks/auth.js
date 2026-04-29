function useAuth() {
  const API_URL = "https://identity-profile-api-service.vercel.app";

  const login = () => {
    window.location.href = `${API_URL}/auth/github`;
  };



  return { login };
}

export default useAuth;