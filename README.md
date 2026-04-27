# 🚀 Task Manager API

A RESTful Task Management API built with **Node.js** and **Express**.  
This project demonstrates a clean architecture with CRUD operations and JSON-based persistence.

---

## 📌 Features

- ✅ Create a task
- 📋 Retrieve all tasks
- ✏️ Update a task
- 🗑️ Delete a task
- 🔄 Task status management (`todo`, `in-progress`, `done`)

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js | Runtime environment |
| Express | Web framework |
| File System (JSON) | Data persistence |

---

## 📁 Project Structure

```
task-manager-api/
│
├── controllers/
│   └── taskController.js
├── routes/
│   └── taskRoutes.js
├── models/
│   └── taskModel.js
├── data/
│   └── tasks.json
└── index.js
```

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
npm install
```

### ▶️ Run the project

```bash
npm run dev
```

Server will run on: `http://localhost:3000`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Retrieve all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### 🔹 Create a task

**Request body:**

```json
{
  "title": "Learn Node.js"
}
```

**Example response:**

```json
{
  "id": 1710000000000,
  "title": "Learn Node.js",
  "status": "todo"
}
```

---

## 🎯 Goals of This Project

- Practice REST API design
- Learn backend architecture (MVC pattern)
- Build consistent GitHub contributions

---

## 📌 Future Improvements

- [ ] Add validation middleware
- [ ] Add filtering & pagination
- [ ] Replace JSON storage with a database (MongoDB)
- [ ] Add authentication (JWT)

---

## 👨‍💻 Author

**Your Name** — [GitHub](https://github.com/your-username)
