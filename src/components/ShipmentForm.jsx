// inside form submit handler
import { fetchJson } from "../utils/api";

async function handleSubmit(e) {
  e.preventDefault();
  try {
    const body = { origin, destination, status, notes };
    const res = await fetchJson("/api/shipments", { method: "POST", body: JSON.stringify(body) });
    // update parent state (prop) or refetch list
    onCreated(res.data); // call parent's handler to add to state
    resetForm();
  } catch (err) {
    alert(err.message || "Failed to create shipment");
  }
}
