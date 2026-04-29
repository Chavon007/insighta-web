function useAccount() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const getMe = async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch account info");

    const data = await res.json();
    return data;
  };

  return { getMe };
}

export default useAccount;
