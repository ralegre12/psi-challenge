<!-- README.md -->

# Psi‑Challenge

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Este repositorio contiene dos proyectos:

- **backend**: API REST con NestJS, TypeORM y SQLite en memoria.  
- **frontend**: SPA en React con Vite, React Query y Jest para pruebas unitarias.

---

## 📁 Estructura de carpetas
psi-challenge/

├── backend/ # NestJS + TypeORM + SQLite in-memory
├── frontend/ # React + Vite + React Query + Jest
├── .gitignore
├── package.json
└── README.md

## 🔧 Prerrequisitos

- **Node.js** v18+  
- **npm** o **yarn**  
- (Opcional) **Git** y cuenta en GitHub para subir cambios

---

## 🚀 Clonar el repositorio

git clone git@github.com:ralegre12/psi-challenge.git
cd psi-challenge


💾 Backend

- **cd backend**
- **npm install**
- **npm run start:dev**       # Levanta el servidor en modo desarrollo (http://localhost:3000)
- **npm run test:e2e**        # Ejecuta los tests end‑to‑end


🌐 Frontend

- **cd frontend**
- **npm install**
- **npm run dev**             # Levanta la SPA en modo desarrollo (http://localhost:5173)
- **npm test**                # Ejecuta los tests unitarios con Jest

⚙️ Configuración de la API en el Frontend
Por defecto, el cliente Axios del frontend apunta al mismo host.
Si tu API backend corre en otro puerto o dominio, edita:
// frontend/src/services/api.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000', // <- Ajusta según tu servidor
});


📄 Licencia
Este proyecto está bajo la MIT License.

