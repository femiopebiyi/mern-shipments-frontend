import { useEffect, useState } from "react";
import axios from "axios";
import ShipmentForm from "./ShipmentForm";

export default function ShipmentList() {
    const [shipments, setShipments] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [updatedData, setUpdatedData] = useState({});

    const fetchShipments = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL);
            setShipments(res.data);
        } catch (err) {
            console.error("Error fetching shipments:", err);
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
        fetchShipments();
    };

    const handleEdit = (shipment) => {
        setEditingId(shipment._id);
        setUpdatedData({
            origin: shipment.origin,
            destination: shipment.destination,
            status: shipment.status,
        });
    };

    const handleUpdate = async (id) => {
        await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, updatedData);
        setEditingId(null);
        fetchShipments();
    };

    return (
        <div className="app-container">
            <h1>Shipment Management System</h1>

            <ShipmentForm onShipmentAdded={fetchShipments} />

            <div>
                {shipments.map((shipment) => (
                    <div key={shipment._id} className="shipment-card">
                        {editingId === shipment._id ? (
                            <>
                                <div className="edit-form">
                                    <input
                                        value={updatedData.origin}
                                        onChange={(e) =>
                                            setUpdatedData({
                                                ...updatedData,
                                                origin: e.target.value,
                                            })
                                        }
                                        placeholder="Origin"
                                    />
                                    <input
                                        value={updatedData.destination}
                                        onChange={(e) =>
                                            setUpdatedData({
                                                ...updatedData,
                                                destination: e.target.value,
                                            })
                                        }
                                        placeholder="Destination"
                                    />
                                    <select
                                        value={updatedData.status}
                                        onChange={(e) =>
                                            setUpdatedData({
                                                ...updatedData,
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option>Pending</option>
                                        <option>In Transit</option>
                                        <option>Delivered</option>
                                    </select>
                                </div>
                                <div className="btn-group">
                                    <button
                                        onClick={() => handleUpdate(shipment._id)}
                                        className="btn save"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="btn cancel"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="shipment-info">
                                    <span>
                                        {shipment.origin} → {shipment.destination}
                                    </span>
                                    <span
                                        className={`status ${shipment.status.replace(/\s/g, "-")}`}
                                    >
                                        {shipment.status}
                                    </span>
                                    {/* Display Shipment ID */}
                                    <span className="shipment-id">ID: {shipment._id}</span>
                                </div>

                                <div className="btn-group">
                                    <button
                                        onClick={() => handleEdit(shipment)}
                                        className="btn edit"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(shipment._id)}
                                        className="btn delete"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
