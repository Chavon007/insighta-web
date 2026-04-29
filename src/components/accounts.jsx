"use client";
import { useEffect, useState } from "react";
import useAccount from "@/hooks/account";

function Account() {
  const { getMe, logout } = useAccount();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getMe();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className="p-6 text-neutral-500">Loading account...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Account</h1>
        <p className="text-sm text-neutral-500">Your profile information</p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4 mb-6">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.username}
              className="w-16 h-16 rounded-full border border-neutral-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xl font-bold">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-neutral-800">
              @{user?.username}
            </h2>
            <p className="text-sm text-neutral-500">{user?.email}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="text-xs text-neutral-400 uppercase mb-1">Role</p>
            <p className="text-sm font-medium text-neutral-800 capitalize">
              {user?.role}
            </p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="text-xs text-neutral-400 uppercase mb-1">Status</p>
            <p className="text-sm font-medium text-green-600">Active</p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4 col-span-2">
            <p className="text-xs text-neutral-400 uppercase mb-1">Email</p>
            <p className="text-sm font-medium text-neutral-800">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default Account;
