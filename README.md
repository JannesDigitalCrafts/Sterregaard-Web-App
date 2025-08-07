# 🌿 Sterregaard Web App

A simple inventory and user management system for Sterregaard, built using:

- ⚛️ **Frontend**: React.js
- 🚀 **Backend**: Node.js + Express
- 🗄️ **Database**: SQLite (via `better-sqlite3`)
- ☁️ **Hosting**: Render.com

---

## 🔧 Features

- ✅ User authentication with role support (`admin`, `staff`)
- ✅ Protected routes for admins and staff
- ✅ Inventory management:
  - Add/update/delete products
  - Adjust quantity with mutation reason (sell, damage, overdue, etc.)
  - View full mutation history
- ✅ Admin settings:
  - Manage users
  - (Soon) Manage product categories/types
- ✅ Clean sidebar navigation layout
- ✅ Fully structured frontend/backend folder setup

---

## 📁 Project Structure

```
Sterregaard-Web-App/
│
├── frontend/
│   ├── Views/
│   │   ├── Dashboard/
│   │   ├── Inventory/
│   │   ├── Login/
│   │   ├── Navigation/
│   │   └── Settings/
│   ├── Guards/             # AdminRoute / ProtectedRoute
│   ├── App.js
│   └── index.js
│
├── backend/
│   ├── server.js
│   └── db.js
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/JannesDigitalCrafts/Sterregaard-Web-App.git
cd Sterregaard-Web-App
```

### 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

---

## 🧪 Default Credentials

| Role  | Username | Password  |
|-------|----------|-----------|
| Admin | admin    | admin123  |

---

## 🌐 Hosting (Render Setup)

For proper SPA routing in Render.com, add the following **redirect rule**:

```
Source:      /*
Destination: /index.html
Status:      200
```

---

## 📌 TODO / Roadmap

- [x] Inventory quantity adjustment
- [x] History log per item
- [x] Role-based route guarding
- [x] Admin user management
- [ ] Export inventory as CSV
- [ ] Product types/categories management
- [ ] Audit logs & user action tracking

---

## 📄 License

MIT License — _Free to use for any purpose_