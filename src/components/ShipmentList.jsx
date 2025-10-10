// src/components/ShipmentList.jsx
import React, { useEffect, useState } from "react";
import { fetchJson } from "../utils/api";

export default function ShipmentList({ onEdit }) {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load all shipments
    const loadShipments = async () => {
        try {
            setLoading(true);
            const res = await fetchJson("/shipments");
            setShipments(res.data || []);
            setError(null);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to load shipments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadShipments();
    }, []);

    // Delete shipment
    const handleDelete = async (id) => {
        const confirmDelete = confirm("Delete this shipment?");
        if (!confirmDelete) return;

        try {
            await fetchJson(`/shipments/${id}`, { method: "DELETE" });
            setShipments((prev) => prev.filter((s) => s._id !== id));
        } catch (err) {
            alert(err.message || "Failed to delete shipment");
        }
    };

    if (loading) return <div>Loading shipments...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (shipments.length === 0) return <div>No shipments yet — add one.</div>;

    return (
        <div className="shipment-list">
            {shipments.map((s) => (
                <div key={s._id} className="shipment-card">
                    <div><strong>ID:</strong> {s._id}</div>
                    <div><strong>Origin:</strong> {s.origin}</div>
                    <div><strong>Destination:</strong> {s.destination}</div>
                    <div><strong>Status:</strong> {s.status}</div>
                    <div><strong>Notes:</strong> {s.notes || "—"}</div>
                    <div className="shipment-actions">
                        <button onClick={() => onEdit && onEdit(s)}>Edit</button>
                        <button onClick={() => handleDelete(s._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
