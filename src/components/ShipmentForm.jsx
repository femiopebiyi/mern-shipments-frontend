// src/components/ShipmentForm.jsx
import React, { useState } from "react";
import { fetchJson } from "../utils/api";

export default function ShipmentForm({ onCreated }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("Pending");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setOrigin("");
    setDestination("");
    setStatus("Pending");
    setNotes("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = { origin, destination, status, notes };
      const res = await fetchJson("/shipments", {
        method: "POST",
        body: JSON.stringify(body),
      });

      // notify parent (if provided)
      if (onCreated) onCreated(res.data);

      resetForm();
      alert("Shipment created successfully!");
    } catch (err) {
      alert(err.message || "Failed to create shipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shipment-form">
      <h3>Add New Shipment</h3>
      <div>
        <label>Origin:</label>
        <input value={origin} onChange={(e) => setOrigin(e.target.value)} required />
      </div>
      <div>
        <label>Destination:</label>
        <input value={destination} onChange={(e) => setDestination(e.target.value)} required />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div>
        <label>Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional notes"
        ></textarea>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Create Shipment"}
      </button>
    </form>

  );
}
