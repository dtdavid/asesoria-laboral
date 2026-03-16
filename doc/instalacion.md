# Instalación y configuración del entorno

Este documento recoge, de forma cronológica, los pasos realizados para la instalación y configuración del entorno de desarrollo del proyecto.

## 14-01-2026

### Entorno base

- Node.js v22.22.0 (LTS)
- npm 10.9.4
- Sistema operativo: Windows 11

## Frontend

### Creación del proyecto con Vite + React:

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev
```

- Servidor de desarrollo funcionando correctamente en: http://localhost:5173/

## 15-01-2026

### Enrutado del frontend

Se instala React Router DOM para la gestión de rutas públicas y privadas en la SPA.

```bash
npm install react-router-dom
```

### Iconos

Se utiliza la librería `react-icons` para incorporar iconos SVG como componentes React.

```bash
npm install react-icons
```

### Autenticación (simulada)

Se implementa un sistema de autenticación simulado utilizando React Context API, con el objetivo de:

- Proteger rutas privadas
- Simular login/logout
- Preparar la arquitectura para una futura autenticación con JWT

No se realiza ninguna conexión a backend en esta fase.

## 06-02-2026

### Estilos – Tailwind CSS

Se instala Tailwind CSS como framework de estilos utilitario para facilitar la maquetación rápida y responsive del prototipo.

```bash
npm install -D tailwindcss@3.4.17 postcss autoprefixer
```

Se configuran los archivos:

```bash
tailwind.config.js
postcss.config.js
```

Se inicializa Tailwind en el archivo src/index.css mediante las directivas:

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 16-02-2026

# Backend – Inicialización del servidor

Se crea la carpeta `backend/` dentro del repositorio principal para separar claramente la arquitectura en dos capas:

- `frontend/` → Cliente (React)
- `backend/` → API REST (Node.js + Express)

---

## Inicialización del proyecto backend

Desde la raíz del proyecto:

```bash
cd backend
npm init -y
```

Se genera el archivo `package.json`, que actúa como descriptor del proyecto backend, donde se definen:

- Dependencias
- Scripts
- Metadatos del proyecto

---

## Instalación de dependencias principales

```bash
npm install express pg dotenv cors jsonwebtoken bcryptjs
```

### Justificación técnica

- **express** → Framework minimalista para crear la API REST.
- **pg** → Cliente oficial para conectarse a PostgreSQL desde Node.js.
- **dotenv** → Permite cargar variables de entorno desde archivo `.env`.
- **cors** → Habilita peticiones entre frontend (puerto 5173) y backend (puerto 3000).
- **jsonwebtoken** → Preparación para autenticación basada en JWT.
- **bcryptjs** → Preparación para encriptado de contraseñas.

---

## Instalación de dependencia de desarrollo

```bash
npm install -D nodemon
```

### ¿Por qué nodemon?

`nodemon` reinicia automáticamente el servidor cuando detecta cambios en archivos `.js`.  
Facilita el desarrollo evitando reinicios manuales.

---

## Configuración de scripts en package.json

Se añaden los siguientes scripts:

```json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

### Explicación

- `npm run dev` → Modo desarrollo con recarga automática.
- `npm start` → Modo ejecución normal (producción).

---

# Estructura inicial del backend

Se crea la siguiente estructura:

```
backend/
├── src/
│   ├── app.js
│   ├── server.js
│   └── db.js
├── .env.example
└── package.json
```

---

## server.js

Responsable de:

- Importar la aplicación Express
- Levantar el servidor
- Escuchar en el puerto definido

---

## app.js

Contiene:

- Inicialización de Express
- Middlewares globales
- Rutas
- Handler de errores

Se implementan los siguientes middlewares:

```js
app.use(cors());
app.use(express.json());
```

### Justificación

- `cors()` → Permite comunicación entre frontend y backend en distintos puertos.
- `express.json()` → Permite leer JSON enviado en el body de las peticiones.

---

## Endpoint de verificación

Se crea endpoint de salud:

```
GET /health
```

Permite comprobar que la API responde correctamente.

Respuesta ejemplo:

```json
{
  "ok": true,
  "service": "backend",
  "ts": "2026-02-16T22:33:11.005Z"
}
```

---

## Endpoint de conexión a base de datos

Se implementa:

```
GET /db-time
```

Internamente ejecuta:

```sql
SELECT NOW();
```

Objetivo:

- Verificar conexión correcta con PostgreSQL
- Confirmar configuración de variables de entorno

---

# Variables de entorno

Se crea archivo plantilla:

```
backend/.env.example
```

Contenido:

```env
PORT=3000
PGHOST=localhost
PGPORT=5432
PGDATABASE=asesoria_laboral
PGUSER=postgres
PGPASSWORD=tu_password
```

### Consideraciones de seguridad

- El archivo `.env` real está ignorado en `.gitignore`
- No se suben credenciales reales al repositorio

---

## Configuración de PostgreSQL

Se utiliza PostgreSQL instalado previamente en el sistema.

Desde `psql`:

```sql
CREATE DATABASE asesoria_laboral;
```

Verificación:

```sql
\l
```

---

## Archivo db.js

Se configura conexión mediante Pool:

```js
import pg from "pg";

export const pool = new pg.Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});
```

### ¿Por qué Pool?

- Gestiona múltiples conexiones
- Optimiza rendimiento
- Es práctica estándar en aplicaciones reales

---

## 17-02-2026

### Verificación completa del backend

Se realizan pruebas:

- `GET /health`
- `GET /db-time`
- `POST /echo`

Resultados correctos.

Servidor operativo en:

```
http://localhost:3000
```

Conexión con base de datos confirmada.

---

## Estado al finalizar esta fase

✔ Backend Express funcional  
✔ Conexión con PostgreSQL verificada  
✔ Arquitectura separada frontend/backend  
✔ Variables de entorno configuradas  
✔ Preparación para implementación de autenticación JWT

## 12-03-2026

### Backend – Tests

Se incorporaron pruebas automatizadas al backend con **Jest** y **Supertest**, con el objetivo de verificar el comportamiento básico de la API y reforzar la fiabilidad del servidor antes del despliegue.

#### Instalación de dependencias de test

Desde la carpeta `backend/`:

```bash
npm install -D jest supertest cross-env
```

Configuración del script de test

En backend/package.json se definió el siguiente script:

```JSON
"test": "cross-env NODE_OPTIONS=--experimental-vm-modules jest"
```

Ejecución de pruebas

Desde la carpeta backend/:

```bash
npm test
```

Finalidad

Las pruebas backend se utilizaron para validar endpoints y detectar errores antes de la fase final de despliegue.

## 13-03-2026

### Entorno reproducible – Docker y Docker Compose

Se definieron:

- backend/Dockerfile
- frontend/Dockerfile
- docker-compose.yml

**Backend – Dockerfile**

**El backend se configuró para ejecutarse en un contenedor Node.js, instalando dependencias y arrancando mediante:**

```bash
npm start
```

## 14-03-2026

### Backend – Despliegue en Railway

Se realizó el despliegue del backend en Railway, utilizando la CLI oficial desde PowerShell en VS Code.

#### Instalación de Railway CLI

Desde la raíz del proyecto:

```bash
npm install -g @railway/cli
railway --version
```

A continuación se inició sesión:

```bash
railway login
railway whoami
```

Creación del proyecto en Railway

Desde la raíz del proyecto:

```bash
railway init
railway status
```

Se creó un proyecto nuevo para el despliegue del backend.

Creación de la base de datos PostgreSQL en Railway

Desde la raíz del proyecto:

```bash
railway add
```

En el asistente se seleccionó:

- Database
- PostgreSQL
- Creación del servicio backend

Desde la carpeta backend/:

```bash
cd backend
railway add
railway service link
railway status
```

En el asistente se creó un **Empty Service** con el nombre **backend**.

#### Configuración del directorio raíz del servicio

En el **panel web de Railway**, dentro del servicio **backend**, se configuró:

**Settings**

**Root Directory** → /backend

Esto fue necesario porque el proyecto está organizado en dos carpetas principales:

frontend/
backend/

#### Despliegue del backend

Desde la carpeta backend/:

```bash
railway up
```

Para revisar logs:

```bash
railway logs --deployment --latest
```

Variables de entorno en producción

En el servicio backend se configuraron las variables necesarias para el funcionamiento en Railway:

```bash
JWT_SECRET=...
PGHOST=...
PGPORT=...
PGDATABASE=...
PGUSER=...
PGPASSWORD=...
```

#### URL pública del backend

**Backend desplegado en Railway:**

https://backend-production-583a.up.railway.app
Verificación básica del despliegue

Se comprobaron los endpoints públicos:

```bash
Health check
GET /health
```

Respuesta esperada:

```JSON
{
"ok": true,
"service": "backend",
"ts": "..."
}
```

Comprobación de conexión a base de datos

```bash
GET /db-time
```

Respuesta esperada:

```JSON
{
"ok": true,
"now": "..."
}
```

#### Carga del esquema y datos en PostgreSQL Railway

Railway no ejecuta automáticamente los scripts SQL usados en el entorno local con Docker, por lo que fue necesario cargar manualmente el esquema y los datos seed con psql.

Antes de ejecutar scripts SQL en Windows/PowerShell, fue necesario forzar UTF-8:

```bash
chcp 65001
$env:PGCLIENTENCODING="UTF8"
$env:PGPASSWORD="TU_PASSWORD"
```

A continuación se cargaron los scripts SQL necesarios en PostgreSQL Railway.

Verificación funcional en producción

Una vez cargada la base de datos, se probaron en producción con Thunder Client varios endpoints representativos:

```BASH
POST /auth/login
GET /usuarios?role=CLIENTE
GET /me/empresa
GET /incidencias?empresa_id=1
```

Con ello se verificó:

1. autenticación JWT operativa
2. autorización por rol funcionando
3. conexión real con PostgreSQL
4. lectura correcta de datos persistidos
5. backend plenamente funcional en producción

#### Estado al finalizar esta fase

✔ Tests backend preparados y ejecutables
✔ Entorno local reproducible con Docker y PostgreSQL
✔ Backend desplegado en Railway
✔ Base de datos PostgreSQL operativa en producción
✔ Variables de entorno configuradas
✔ Endpoints principales probados en producción

#### Despliegue del frontend en Vercel utilizando la carpeta frontend/ del proyecto.

URL pública del frontend

`https://asesoria-laboral-frontend.vercel.app`

Variable de entorno configurada

Para conectar el frontend con la API desplegada en Railway se configuró:

`VITE_API_URL=https://backend-production-583a.up.railway.app`

Proceso seguido

Desde la carpeta frontend/ se utilizó Vercel CLI para:

1. iniciar sesión
2. enlazar el proyecto local con Vercel
3. crear la variable de entorno de producción
4. desplegar en producción

**Comandos principales utilizados:**

```bash
npm install -g vercel
vercel login
vercel link
vercel env add VITE_API_URL production
vercel --prod
```

#### Verificaciones realizadas

**Tras el despliegue se comprobó:**

✔ acceso correcto al frontend publicado
✔ comunicación correcta con el backend en Railway
✔ funcionamiento del login
✔ carga correcta de pantallas protegidas
✔ comportamiento esperado de usuarios pendientes de asignación de empresa

#### Resultado

**El frontend quedó desplegado y conectado con el backend y la base de datos remotos, completando así una primera versión funcional del sistema en entorno cloud.**
