import { getAuthToken } from "@/utils/getToken";

function useProfile() {
  const API_URL = "https://identity-profile-api-service.vercel.app";

  const getProfiles = async (page = 1) => {
    const token = await getAuthToken();

    const res = await fetch(`${API_URL}/api/profiles?page=${page}&limit=10`, {
      headers: {
        "X-API-Version": "1",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch profiles");
    const data = await res.json();
    return data;
  };

  const getProfileDetails = async ({ id }) => {
    const token = await getAuthToken();

    const res = await fetch(`${API_URL}/api/profiles/${id}`, {
      headers: {
        "X-API-Version": "1",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch profile");
    const data = await res.json();
    return data;
  };

  const exportProfiles = async () => {
    const token = await getAuthToken();

    const res = await fetch(`${API_URL}/api/profiles/export?format=csv`, {
      headers: {
        "X-API-Version": "1",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to export profiles");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `profiles_${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const searchProfiles = async (q) => {
    const token = await getAuthToken();

    const res = await fetch(
      `${API_URL}/api/profiles/search?q=${encodeURIComponent(q)}`,
      {
        headers: {
          "X-API-Version": "1",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) throw new Error("Search failed");
    const data = await res.json();
    return data;
  };

  return { getProfiles, getProfileDetails, exportProfiles, searchProfiles };
}

export default useProfile;