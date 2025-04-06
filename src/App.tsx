import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { DashboardOverview } from "./components/DashboardOverview";
import { EquipmentPage } from "./components/pages/EquipmentPage";
import { EquipmentDetail } from "./components/EquipmentDetail";
import { LocationsPage } from "./components/pages/LocationsPage";
import ServiceRequestPage from "./components/pages/ServiceRequestPage";
import { mockEquipmentData } from "./utils/mockData";
import { Routes, Route, useRoutes } from "react-router-dom";
import routes from "tempo-routes";

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
      case "servicerequests":
        return <ServiceRequestPage />;
      default:
        return <DashboardOverview />;
    }
  };

  // For Tempo routes - use the imported routes from tempo-routes
  const tempoRoutesComponent =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

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
          {/* Tempo routes */}
          {tempoRoutesComponent}

          {/* Main application routes */}
          <Routes>
            {/* Add Tempo routes path before the catchall route */}
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}

            {/* Default route for the main content */}
            <Route path="*" element={renderContent()} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
