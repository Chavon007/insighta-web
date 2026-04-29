function useProfile() {
  const API_URL = "https://identity-profile-api-service.vercel.app";
  const getProfiles = async (page = 1) => {
    const res = await fetch(`${API_URL}/api/profiles?page=${page}&limit=10`, {
      credentials: "include",
      headers: {
        "X-API-Version": "1",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch profiles");

    const data = await res.json();
    return data;
  };

  return { getProfiles };
}

export default useProfile;
