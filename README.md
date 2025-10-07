
---


# ⚛️ MERN Shipments Frontend

This is the **frontend interface** for the MERN Shipments Management Application.  
It’s built using **React (Vite)** and connects to the backend REST API to manage shipments.

---

## 📦 Tech Stack
- **React (Vite)**
- **Axios**
- **JavaScript (ES6)**
- **CSS3**

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/mern-shipments-frontend.git
cd mern-shipments-frontend

---

Install dependencies
npm install

---

Create a .env file in the project root
VITE_API_URL=http://localhost:5000/api/shipments

---

When deployed, replace it with your live backend URL:

VITE_API_URL=https://mern-shipments-api.onrender.com/api/shipments

---

Run the Application
npm run dev

---

Frontend runs on:
👉 http://localhost:5173

🧭 Features

✅ Fetch and display all shipments
✅ Add a new shipment
✅ Edit and update shipment details
✅ Delete shipments
✅ Automatically refresh list after CRUD actions

---

Folder Structure
mern-shipments-frontend/
├── src/
│   ├── components/
│   │   ├── ShipmentList.jsx
│   │   └── ShipmentForm.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── .env

---

Deployment

You can deploy this frontend to:

Vercel
 — ✅ Recommended

Netlify

GitHub Pages

Example:
npm run build


Then upload the dist/ folder or connect your Git repo to Vercel/Netlify.

---

API Integration

Ensure your .env in the frontend has the correct backend URL.
Example when backend is hosted on Render:

VITE_API_URL=https://mern-shipments-api.onrender.com/api/shipments

---

AUTHOR
 OPEBIYI OLUWAFEMI BABATUNDE- FULLSTACK DEVELOPER

 ---