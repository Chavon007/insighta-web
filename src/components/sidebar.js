"use client";

import { FiGrid, FiUsers, FiSearch, FiUser } from "react-icons/fi";

const sideContent = [
  { title: "Dashboard", icon: <FiGrid size={20} /> },
  { title: "Profiles", icon: <FiUsers size={20} /> },
  { title: "Search", icon: <FiSearch size={20} /> },
  { title: "Account", icon: <FiUser size={20} /> },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <span className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-md font-bold">
            I
          </span>
          <span>Insighta Labs+</span>
        </h2>
        <small className="text-xs text-gray-500 ml-10">
          v1 · internal platform
        </small>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <h4 className="text-xs font-semibold text-gray-400 mb-4 px-2">MAIN</h4>
        <nav className="space-y-2">
          {sideContent.map((s, index) => (
            <div
              key={index}
              onClick={() => setActivePage(s.title)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition text-sm font-medium
                ${
                  activePage === s.title
                    ? "bg-neutral-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <span>{s.icon}</span>
              <span>{s.title}</span>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
