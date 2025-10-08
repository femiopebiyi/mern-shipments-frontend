import { useState } from "react";
import axios from "axios";

export default function ShipmentForm({ onShipmentAdded }) {
    const [formData, setFormData] = useState({
        origin: "",
        destination: "",
        status: "Pending",
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(import.meta.env.VITE_API_URL, formData);
            onShipmentAdded();
            setFormData({ origin: "", destination: "", status: "Pending" });
        } catch (error) {
            console.error("Error adding shipment:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
            >
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
            </select>
            <button type="submit">Add</button>
        </form>
    );
}
