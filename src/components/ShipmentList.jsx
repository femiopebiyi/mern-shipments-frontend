import { useEffect, useState } from "react";
import axios from "axios";
import ShipmentForm from "./ShipmentForm";

function ShipmentList() {
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
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
            fetchShipments();
        } catch (err) {
            console.error("Error deleting shipment:", err);
        }
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
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, updatedData);
            setEditingId(null);
            fetchShipments();
        } catch (err) {
            console.error("Error updating shipment:", err);
        }
    };

    return (
        <div className="shipment-container">
            <h2>Shipments</h2>
            <ShipmentForm onShipmentAdded={fetchShipments} />

            <ul className="shipment-list">
                {shipments.map((shipment) => (
                    <li key={shipment._id} className="shipment-item">
                        {editingId === shipment._id ? (
                            <div>
                                <input
                                    value={updatedData.origin}
                                    onChange={(e) =>
                                        setUpdatedData({ ...updatedData, origin: e.target.value })
                                    }
                                />
                                <input
                                    value={updatedData.destination}
                                    onChange={(e) =>
                                        setUpdatedData({
                                            ...updatedData,
                                            destination: e.target.value,
                                        })
                                    }
                                />
                                <select
                                    value={updatedData.status}
                                    onChange={(e) =>
                                        setUpdatedData({ ...updatedData, status: e.target.value })
                                    }
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Transit">In Transit</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                                <button onClick={() => handleUpdate(shipment._id)}>Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <strong>{shipment.origin}</strong> → {shipment.destination} <br />
                                <small>Status: {shipment.status}</small>
                                <div>
                                    <button onClick={() => handleEdit(shipment)}>Edit</button>
                                    <button onClick={() => handleDelete(shipment._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShipmentList;
