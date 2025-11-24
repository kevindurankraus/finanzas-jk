# 💰 Finanzas JK

Aplicación web profesional de gestión financiera con autenticación de usuarios, diseñada con un tema oscuro minimalista.

## ✨ Características

- 🔐 **Autenticación de usuarios** con JWT
- 💸 **Gestión de transacciones** (ingresos y gastos)
- 📦 **Control de inventario** con seguimiento de stock
- 📅 **Agenda de citas** con clientes
- 🧮 **Calculadoras** (peso y división de gastos)
- 🌙 **Modo oscuro/claro**
- 📱 **Diseño responsive**
- 🎨 **UI profesional** con Tailwind CSS

## 🛠️ Tecnologías

### Frontend
- React 19
- Vite
- Tailwind CSS
- Axios
- Lucide React (iconos)

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (autenticación)
- bcryptjs (encriptación)

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- MongoDB (local o Atlas)
- npm o yarn

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/finanzas-jk.git
cd finanzas-jk
```

### 2. Instalar dependencias del frontend
```bash
npm install
```

### 3. Instalar dependencias del backend
```bash
cd server
npm install
```

### 4. Configurar variables de entorno
Crea un archivo `.env` en la carpeta `server/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/finance-tracker
JWT_SECRET=tu_secreto_super_seguro_aqui
```

**⚠️ IMPORTANTE:** Cambia `JWT_SECRET` por una cadena aleatoria segura.

### 5. Iniciar MongoDB
Asegúrate de que MongoDB esté corriendo en tu sistema:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

## 🎯 Uso

### Modo Desarrollo

#### Terminal 1 - Backend:
```bash
cd server
npm run dev
```
El servidor estará en `http://localhost:5000`

#### Terminal 2 - Frontend:
```bash
npm run dev
```
La aplicación estará en `http://localhost:5174`

### Modo Producción

#### Construir el frontend:
```bash
npm run build
```

Los archivos estarán en la carpeta `dist/`

## 📁 Estructura del Proyecto

```
finanzas-jk/
├── src/                      # Código fuente del frontend
│   ├── components/          # Componentes React
│   ├── context/            # Context API (estado global)
│   ├── App.jsx             # Componente principal
│   └── main.jsx            # Punto de entrada
├── server/                  # Backend
│   ├── models/             # Modelos de MongoDB
│   ├── routes/             # Rutas de la API
│   ├── middleware/         # Middleware (autenticación)
│   └── index.js            # Servidor Express
├── public/                  # Archivos estáticos
└── dist/                    # Build de producción
```

## 🔑 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Transacciones
- `GET /api/transactions` - Obtener transacciones
- `POST /api/transactions` - Crear transacción
- `DELETE /api/transactions/:id` - Eliminar transacción

### Inventario
- `GET /api/inventory` - Obtener inventario
- `POST /api/inventory` - Agregar producto
- `PUT /api/inventory/:id` - Actualizar producto
- `DELETE /api/inventory/:id` - Eliminar producto

### Citas
- `GET /api/appointments` - Obtener citas
- `POST /api/appointments` - Crear cita
- `DELETE /api/appointments/:id` - Eliminar cita

## 🎨 Capturas de Pantalla

*(Agrega capturas de pantalla aquí)*

## 🚀 Despliegue

### Frontend (Netlify/Vercel)
1. Construye el proyecto: `npm run build`
2. Sube la carpeta `dist/` a Netlify o Vercel

### Backend (Render/Railway)
1. Crea una cuenta en Render o Railway
2. Conecta tu repositorio
3. Configura las variables de entorno
4. Despliega

### Base de Datos (MongoDB Atlas)
1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén la URI de conexión
4. Actualiza `MONGO_URI` en las variables de entorno

## 📝 Licencia

MIT

## 👤 Autor

**JK**

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
