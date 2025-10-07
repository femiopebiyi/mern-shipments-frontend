import { useState } from "react";
import axios from "axios";

function ShipmentForm({ onShipmentAdded }) {
    const [formData, setFormData] = useState({
        origin: "",
        destination: "",
        status: "Pending",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(import.meta.env.VITE_API_URL, formData);
            onShipmentAdded(); // refresh list
            setFormData({ origin: "", destination: "", status: "Pending" });
        } catch (err) {
            console.error("Error creating shipment:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="shipment-form">
            <input
                type="text"
                name="origin"
                placeholder="Origin"
                value={formData.origin}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={formData.destination}
                onChange={handleChange}
                required
            />
            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
            </select>
            <button type="submit">Add Shipment</button>
        </form>
    );
}

export default ShipmentForm;
