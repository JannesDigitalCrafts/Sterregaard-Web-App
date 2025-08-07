Sterregaard Web App Documentation
A simple inventory and user management system for Sterregaard, built with React (frontend),
Express (backend), and SQLite (database).
Tech Stack:
- Frontend: React.js
- Backend: Node.js + Express
- Database: SQLite (via better-sqlite3)
- Hosting: Render.com
Features:
• User authentication with roles (admin, staff)
• Role-based route protection
• Inventory product listing
• Add/update/mutate product quantities
• History tracking per inventory item
• Admin user management
• Clean sidebar navigation layout
Folder Structure:
/frontend
■■■ src
■ ■■■ Views
■ ■ ■■■ Dashboard
■ ■ ■■■ Inventory
■ ■ ■■■ Login
■ ■ ■■■ Navigation
■ ■ ■■■ Settings
■ ■■■ Guards
■ ■■■ App.js
■ ■■■ index.js
/backend
■■■ server.js
■■■ db.js
Installation:
1. Clone the Repository
git clone https://github.com/JannesDigitalCrafts/Sterregaard-Web-App.git
cd Sterregaard-Web-App
2. Backend Setup
cd backend
npm install
node server.js
3. Frontend Setup
cd ../frontend
npm install
npm start
Default Admin:
Username: admin | Password: admin123 | Role: admin
Render Redirect Rule:
Source: /.*
Destination: /index.html
TODO / Ideas:
• Inventory quantity adjustment ■
• History log per item ■
• Role-based route guarding ■
• Product categories/types in settings ■
• Export inventory as CSV ■
• Audit logs & user actions ■
License:
MIT License
