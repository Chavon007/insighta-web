"use client";
import { useState } from "react";
import useProfile from "@/hooks/profile";

function Search() {
  const { searchProfiles } = useProfile();
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) {
      setError("Please enter a search query");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await searchProfiles(search);
      setResults(data.data);
      setSearched(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Search</h1>
        <p className="text-sm text-neutral-500">
          Search profiles using natural language
        </p>
      </div>

      {/* Search Input */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder='e.g. "young males from nigeria"'
          className="flex-1 px-4 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className="px-5 py-2 text-sm bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 disabled:opacity-40 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 mb-4">{error}</p>
      )}

      {/* Results */}
      {searched && results.length === 0 && !loading && (
        <p className="text-sm text-neutral-400">No results found.</p>
      )}

      {results.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl border border-neutral-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-100 text-neutral-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Age Group</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {results.map((profile) => (
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
                    {profile.country_id}
                  </td>
                  <td className="px-4 py-3 text-neutral-400 text-xs">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Search;