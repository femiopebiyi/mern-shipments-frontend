import { useEffect, useState } from "react";
import { fetchJson } from "../utils/api";

export default function ShipmentList() {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        origin: "",
        destination: "",
        status: "",
        notes: "",
    });

    const loadShipments = async () => {
        try {
            setLoading(true);
            const res = await fetchJson("/shipments");
            setShipments(Array.isArray(res) ? res : res.data || []);
            setError(null);
        } catch (err) {
            setError(err.message || "Failed to load shipments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadShipments();
    }, []);

    const startEditing = (shipment) => {
        setEditingId(shipment._id);
        setEditForm({
            origin: shipment.origin,
            destination: shipment.destination,
            status: shipment.status,
            notes: shipment.notes || "",
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({ origin: "", destination: "", status: "", notes: "" });
    };

    const saveEdit = async (id) => {
        try {
            const res = await fetchJson(`/shipments/${id}`, {
                method: "PUT",
                body: JSON.stringify(editForm),
            });
            // Update the local state with the edited shipment
            setShipments((prev) =>
                prev.map((s) => (s._id === id ? res.data || res : s))
            );
            cancelEdit();
        } catch (err) {
            alert(err.message || "Failed to update shipment");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this shipment?")) return;
        try {
            await fetchJson(`/shipments/${id}`, { method: "DELETE" });
            setShipments((prev) => prev.filter((s) => s._id !== id));
        } catch (err) {
            alert(err.message || "Delete failed");
        }
    };

    if (loading) return <div>Loading shipments...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (shipments.length === 0) return <div>No shipments yet — add one.</div>;

    return (
        <div className="shipment-list">
            {shipments.map((s) => (
                <div key={s._id} className="shipment-card">
                    {editingId === s._id ? (
                        // EDIT MODE
                        <div className="edit-form">
                            <input
                                type="text"
                                value={editForm.origin}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, origin: e.target.value })
                                }
                                placeholder="Origin"
                            />
                            <input
                                type="text"
                                value={editForm.destination}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, destination: e.target.value })
                                }
                                placeholder="Destination"
                            />
                            <select
                                value={editForm.status}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, status: e.target.value })
                                }
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Transit">In Transit</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            <input
                                type="text"
                                value={editForm.notes}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, notes: e.target.value })
                                }
                                placeholder="Notes (optional)"
                            />

                            <div className="btn-group">
                                <button className="btn save" onClick={() => saveEdit(s._id)}>
                                    Save
                                </button>
                                <button className="btn cancel" onClick={cancelEdit}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        // DISPLAY MODE
                        <>
                            <div className="shipment-info">
                                <span>
                                    <strong>Origin:</strong> {s.origin}
                                </span>
                                <span>
                                    <strong>Destination:</strong> {s.destination}
                                </span>
                                <span>
                                    <strong>Status:</strong>{" "}
                                    <span className={`status ${s.status.replace(/\s+/g, "-")}`}>
                                        {s.status}
                                    </span>
                                </span>
                                {s.notes && (
                                    <span>
                                        <strong>Notes:</strong> {s.notes}
                                    </span>
                                )}
                                <div className="shipment-id">
                                    <strong>ID:</strong> {s._id}
                                </div>
                            </div>

                            <div className="btn-group">
                                <button className="btn edit" onClick={() => startEditing(s)}>
                                    Edit
                                </button>
                                <button className="btn delete" onClick={() => handleDelete(s._id)}>
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
