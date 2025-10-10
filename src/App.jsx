import React, { useState } from "react";
import ShipmentForm from "./components/ShipmentForm";
import ShipmentList from "./components/ShipmentList";
import "./index.css";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const handleShipmentCreated = () => {
    console.log("🔄 Refresh triggered");
    setRefresh((prev) => !prev);
  };

  return (
    <div className="app-container">
      <h1>📦 Shipment Management System</h1>
      <ShipmentForm onCreated={handleShipmentCreated} />
      <ShipmentList key={refresh} />
    </div>
  );
}
