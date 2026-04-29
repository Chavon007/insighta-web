"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import ProfileList from "@/components/profileList";

function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderContent = () => {
    if (activePage === "Profiles") {
      return <ProfileList />;
    }

    if (activePage === "Search") {
      return <div className="p-6 text-neutral-500">Search coming soon...</div>;
    }

    if (activePage === "Account") {
      return <div className="p-6 text-neutral-500">Account coming soon...</div>;
    }

    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-neutral-800 mb-2">
          Welcome back 👋
        </h2>
        <p className="text-neutral-500 text-sm">
          Select a section from the sidebar to get started.
        </p>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar activePage={activePage} />
        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}

export default Dashboard;
