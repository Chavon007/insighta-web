"use client";
import { useEffect, useState } from "react";
import useProfile from "@/hooks/profile";

function ProfileList({ onSelect }) {
  const { getProfiles, exportProfiles } = useProfile();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const data = await getProfiles(page);
        setProfiles(data.data);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [page]);

  if (loading)
    return <p className="p-6 text-neutral-500">Loading profiles...</p>;

  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Profiles</h1>
        <p className="text-sm text-neutral-500">
          Manage and view all user profiles
        </p>
        <button
          onClick={() => exportProfiles()}
          className="px-4 py-2 text-sm bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl border border-neutral-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-neutral-100 text-neutral-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Age Group</th>
              <th className="px-4 py-3">Probability</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {profiles.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-neutral-400">
                  No profiles found
                </td>
              </tr>
            ) : (
              profiles.map((profile) => (
                <tr
                  key={profile.id}
                  className="border-t border-neutral-100 hover:bg-neutral-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-neutral-800 capitalize">
                    {profile.name}
                  </td>
                  <td className="px-4 py-3 capitalize text-neutral-600">
                    {profile.gender}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{profile.age}</td>
                  <td className="px-4 py-3 capitalize text-neutral-600">
                    {profile.age_group}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {(profile.gender_probability * 100).toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {profile.country_id}
                  </td>
                  <td className="px-4 py-3 text-neutral-400 text-xs">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </td>

                  {/* FIXED ACTIONS */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onSelect(profile.id)}
                      className="text-sm font-medium text-neutral-800 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 text-sm bg-neutral-900 text-white rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm text-neutral-500">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 text-sm bg-neutral-900 text-white rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProfileList;
