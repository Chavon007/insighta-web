import { getAuthToken } from "@/utils/getToken";
import useCsrf from "@/hooks/csrf";

function useAccount() {
  const API_URL = "https://identity-profile-api-service.vercel.app";
  const { getCsrfToken } = useCsrf();

  const getMe = async () => {
    const token = await getAuthToken();

    const res = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    console.log("ACCOUNT RESPONSE:", data); 

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch account info");
    }

    return data.data; 
  };

  const logout = async () => {
    const csrfToken = await getCsrfToken();
    const token = await getAuthToken();

    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-csrf-token": csrfToken,
      },
    });
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return { getMe, logout };
}

export default useAccount;
