"use client";
import { FaGithub } from "react-icons/fa";
import useAuth from "@/hooks/auth";

export function Login() {
  const { login } = useAuth();
  const handleLogin = async () => {
    login();
  };

  return (
    <div className="min-h-screen flex">
      {/* write up */}
      <div className="w-1/2 bg-neutral-900 text-white flex flex-col px-16 py-12">
        {/* CENTERED CONTENT */}
        <div className="flex-1 flex items-center">
          <div>
            <h2 className="flex items-center gap-4 mb-8">
              {/* I box */}
              <span className="bg-neutral-200 text-neutral-900 w-10 h-10 flex items-center justify-center rounded-md font-semibold">
                I
              </span>

              {/* divider */}
              <span className="w-px h-6 bg-neutral-600"></span>

              {/* text */}
              <span className="text-2xl font-semibold tracking-wide">
                Insighta Labs+
              </span>
            </h2>

            <p className="text-lg text-neutral-200 mb-4 max-w-md">
              Profile Intelligence, secured for your team.
            </p>

            <small className="text-neutral-400 leading-relaxed block max-w-sm">
              Filter, search, and export profile data across your organisation —
              with role-based access control.
            </small>
          </div>
        </div>

        {/* BOTTOM TEXT */}
        <small className="text-neutral-500 text-sm">
          Internal use only · Insighta Labs
        </small>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-neutral-100 flex items-center justify-center">
        <div className="w-[420px] bg-white p-10 rounded-2xl border border-neutral-200">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-neutral-800">Sign in</h2>
            <p className="text-neutral-500 text-sm">
              Access your Insighta Labs+ account
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-neutral-900 text-white py-3 rounded-lg hover:bg-neutral-800 transition"
          >
            <FaGithub className="text-lg" />
            Continue with GitHub
          </button>

          <small className="block text-neutral-400 mt-4 text-xs">
            By signing in you agree to the internal usage policy.
          </small>

          <small className="block text-neutral-400 mt-1 text-xs">
            Default role on first login: analyst
          </small>

          <div className="mt-6 bg-neutral-50 p-4 rounded-lg border border-neutral-200">
            <h5 className="text-sm font-semibold text-neutral-700 mb-2">
              Role info
            </h5>
            <p className="text-neutral-600 text-sm">
              Analyst — read, search, export
            </p>
            <p className="text-neutral-600 text-sm">
              Admin — all above + create, delete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
