"use client";
import useProfile from "@/hooks/profile";
import { useEffect, useState } from "react";

function ProfileDetails({ id, onBack }) {
  const { getProfileDetails, exportProfiles } = useProfile();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        setLoading(true);
        const data = await getProfileDetails({ id });
        setDetails(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileDetails();
  }, [id]);

  if (loading) return <p className="p-6 text-neutral-500">Loading profile...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!details) return null;

  return (
    <div className="p-6 max-w-2xl">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-6 text-sm text-neutral-500 hover:text-neutral-800 flex items-center gap-1 transition"
      >
        ← Back to Profiles
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-neutral-800 capitalize">
            {details.name}
          </h2>
          {/* Export CSV button */}
          <button
            onClick={() => exportProfiles()}
            className="px-4 py-2 text-sm bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition"
          >
            Export CSV
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="text-xs text-neutral-400 uppercase mb-1">Gender</p>
            <p className="text-sm font-medium text-neutral-800 capitalize">
              {details.gender}
            </p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="text-xs text-neutral-400 uppercase mb-1">Age</p>
            <p className="text-sm font-medium text-neutral-800">{details.age}</p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="text-xs text-neutral-400 uppercase mb-1">Age Group</p>
            <p className="text-sm font-medium text-neutral-800 capitalize">
              {details.age_group}
            </p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="text-xs text-neutral-400 uppercase mb-1">
              Gender Probability
            </p>
            <p className="text-sm font-medium text-neutral-800">
              {(details.gender_probability * 100).toFixed(1)}%
            </p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="text-xs text-neutral-400 uppercase mb-1">Country</p>
            <p className="text-sm font-medium text-neutral-800">
              {details.country_id}
            </p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="text-xs text-neutral-400 uppercase mb-1">
              Country Probability
            </p>
            <p className="text-sm font-medium text-neutral-800">
              {(details.country_probability * 100).toFixed(1)}%
            </p>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4 col-span-2">
            <p className="text-xs text-neutral-400 uppercase mb-1">Created</p>
            <p className="text-sm font-medium text-neutral-800">
              {new Date(details.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;