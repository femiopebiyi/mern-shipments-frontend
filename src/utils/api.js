// src/utils/api.js
const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";

export async function fetchJson(path, opts = {}) {
    const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...opts,
    });

    // Try to parse JSON; handle HTML fallback
    const text = await res.text();
    let json;
    try {
        json = JSON.parse(text);
    } catch {
        throw new Error(
            `Expected JSON but got: ${text.slice(0, 50)}... (check your API URL or server routes)`
        );
    }

    if (!res.ok) {
        throw new Error(json.message || `Request failed with ${res.status}`);
    }

    return json;
}
