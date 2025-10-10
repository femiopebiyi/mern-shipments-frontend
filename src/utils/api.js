const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";

// 🔍 Debug log: confirm API base URL during build/runtime
if (typeof window !== "undefined") {
    console.log("🔗 API Base URL (from .env):", BASE_URL);
}

export async function fetchJson(path, opts = {}) {
    const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...opts,
    });

    const text = await res.text();
    let json;
    try {
        json = JSON.parse(text);
    } catch {
        throw new Error(
            `Expected JSON but got: ${text.slice(0, 60)}... (check your API URL or server routes)`
        );
    }

    if (!res.ok) {
        throw new Error(json.message || `Request failed with ${res.status}`);
    }

    return json;
}
