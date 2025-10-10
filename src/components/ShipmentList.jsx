// src/components/ShipmentList.jsx
import React, { useEffect, useState } from "react";
import { fetchJson } from "../utils/api";

export default function ShipmentList() {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = async () => {
        try {
            setLoading(true);
            const res = await fetchJson("/shipments");
            setShipments(res.data || []);
            setError(null);
        } catch (err) {
            setError(err.message || "Failed to load shipments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleDelete = async (id) => {
        if (!confirm("Delete this shipment?")) return;
        try {
            await fetchJson(`/shipments/${id}`, { method: "DELETE" });
            // remove from local state without refetching entire list
            setShipments(prev => prev.filter(s => s._id !== id));
        } catch (err) {
            alert(err.message || "Delete failed");
        }
    };

    if (loading) return <div>Loading shipments…</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (shipments.length === 0) return <div>No shipments yet — add one.</div>;

    return (
        <div>
            {shipments.map(s => (
                <div key={s._id} className="shipment-card">
                    <div><strong>ID:</strong> {s._id}</div>
                    <div><strong>Origin:</strong> {s.origin}</div>
                    <div><strong>Destination:</strong> {s.destination}</div>
                    <div><strong>Status:</strong> {s.status}</div>
                    <div>
                        <button onClick={() => /* open edit form with s */ null}>Edit</button>
                        <button onClick={() => handleDelete(s._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
