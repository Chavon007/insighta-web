"use client";
function Navbar({ activePage }) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shrink-0">
      <div>
        <h4 className="text-lg font-semibold text-gray-800">{activePage}</h4>
        <p className="text-sm text-gray-500">Welcome back 👋</p>
      </div>
    </header>
  );
}

export default Navbar;
