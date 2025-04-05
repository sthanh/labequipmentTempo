import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { DashboardOverview } from "./components/DashboardOverview";
import { EquipmentPage } from "./components/pages/EquipmentPage";
import { EquipmentDetail } from "./components/EquipmentDetail";
import { LocationsPage } from "./components/pages/LocationsPage";
import { mockEquipmentData } from "./utils/mockData";
import { Routes, Route, useRoutes } from "react-router-dom";

export function App() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard"); // 'dashboard', 'equipment', 'locations', etc.

  const handleEquipmentSelect = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    setSelectedEquipment(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <>
            <DashboardOverview />
            <div className="mt-6">
              {selectedEquipment && (
                <EquipmentDetail
                  equipment={selectedEquipment}
                  onBack={() => setSelectedEquipment(null)}
                />
              )}
            </div>
          </>
        );
      case "equipment":
        return selectedEquipment ? (
          <EquipmentDetail
            equipment={selectedEquipment}
            onBack={() => setSelectedEquipment(null)}
          />
        ) : (
          <EquipmentPage
            equipmentData={mockEquipmentData}
            onSelectEquipment={handleEquipmentSelect}
          />
        );
      case "locations":
        return <LocationsPage />;
      default:
        return <DashboardOverview />;
    }
  };

  // For Tempo routes - dynamically import if in Tempo environment
  let tempoRoutes = null;
  if (import.meta.env.VITE_TEMPO === "true") {
    try {
      // This will be handled by the tempo plugin
      // We don't directly import tempo-routes anymore
      tempoRoutes = <Route path="/tempobook/*" element={null} />;
    } catch (error) {
      console.error("Error loading Tempo routes:", error);
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        currentView={currentView}
        onNavigate={handleNavigation}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Main application routes */}
          <Routes>
            {/* Add Tempo routes if in Tempo environment */}
            {tempoRoutes}

            {/* Default route for the main content */}
            <Route path="*" element={renderContent()} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
