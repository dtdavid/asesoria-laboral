# Asesoría Laboral

Aplicación web (React + Express + PostgreSQL) con autenticación JWT, roles (GESTOR/CLIENTE) y endpoints scoped (/me\*).

---

## 1. Tecnologías utilizadas

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- React Icons
- PostCSS
- Autoprefixer

### Backend

- Node.js
- Express
- PostgreSQL
- pg (node-postgres)
- dotenv
- cors
- jsonwebtoken (JWT)
- bcryptjs (hash de contraseñas)
- nodemon

### Testing (backend)

- Jest
- Supertest
- cross-env (Windows)

---

## 2. Estructura del repositorio

```
/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   └── db.js
│   ├── .env.example
│   ├── package.json
│   └── ...
│
└── doc/
    └── doc.md
```

---

## 3. Requisitos previos

- Node.js (LTS)
- npm
- Git
- PostgreSQL instalado en local
- Base de datos creada: `asesoria_laboral`

---

## 4. Instalación

### 4.1 Clonar repositorio

```bash
git clone https://gitlab.iessanclemente.net/dawd/a25daviddt.git
cd a25daviddt
```

---

### 4.2 Instalación del frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend disponible en:

```
http://localhost:5173
```

---

### 4.3 Instalación del backend

```bash
cd backend
npm install
npm run dev
```

Backend disponible en:
http://localhost:3000

---

## 5. Variables de entorno

Archivo plantilla:

```bash
backend/.env.example
```

Ejemplo de contenido:

```env
PORT=3000
PGHOST=localhost
PGPORT=5432
PGDATABASE=asesoria_laboral
PGUSER=postgres
PGPASSWORD=tu_password
JWT_SECRET=tu_clave_super_secreta
```

Para desarrollo:

1. Copiar `.env.example`
2. Renombrar a `.env`
3. Configurar credenciales reales

⚠️ `.env` está ignorado en `.gitignore`.

---

## 6. Creación de la base de datos

Desde `psql`:

```sql
CREATE DATABASE asesoria_laboral;
```

Comprobar:

```sql
\l
```

### 6.1 Inicialización de tablas y datos demo (schema + seed)

Los scripts SQL están en `backend/db` y están numerados para ejecutarse en orden.

Ejemplo (desde la raíz del proyecto):

```bash
psql -U postgres -d asesoria_laboral -f backend/db/02_empresas_schema.sql
psql -U postgres -d asesoria_laboral -f backend/db/03_empresas_seed.sql
psql -U postgres -d asesoria_laboral -f backend/db/04_trabajadores_schema.sql
psql -U postgres -d asesoria_laboral -f backend/db/05_trabajadores_seed.sql
psql -U postgres -d asesoria_laboral -f backend/db/06_incidencias_schema.sql
psql -U postgres -d asesoria_laboral -f backend/db/07_incidencias_seed.sql
psql -U postgres -d asesoria_laboral -f backend/db/08_usuarios_schema.sql
psql -U postgres -d asesoria_laboral -f backend/db/09_usuarios_seed.sql
```

⚠ **Nota** (Windows/PowerShell - acentos/ñ):
Antes de ejecutar seeds con psql, puede ser necesario forzar **UTF8**:

```bash
$env:PGCLIENTENCODING="UTF8"
psql -U postgres -d asesoria_laboral -f backend/db/XX_archivo.sql
```

### 6.2 Usuarios demo

- **GESTOR**:
  - _Usuario_: gestor@demo.test / _Password_: Cliente1234!
- **CLIENTE**:
  - _Usuario_: cliente1@demo.test / _Password_: Cliente1234! (empresa_id=1)

## 7. Instalación con Docker (local)

Requisitos: Docker Desktop + Docker Compose.

> Importante: si tienes la app ejecutándose en local con `npm run dev` (puertos 3000/5173),
> debes pararla antes de levantar Docker para evitar conflictos de puertos.

### 7.1 Arranque

**Desde la raíz del repositorio:**

```bash
docker compose up --build
```

**Si quieres levantar en segundo plano y recuperar el promt de la terminal:**

```bash
docker compose up -d --build
```

**Servicios:**

- 1.Frontend: http://localhost:5173

- 2.Backend (health): http://localhost:3000/health

- 3.PostgreSQL: localhost:5432 (db: asesoria_laboral, user: pfc, pass: pfc)

### 7.2 Usuarios demo

- **GESTOR**:
  - _Usuario_: gestor@demo.test / _Password_: Cliente1234!
- **CLIENTE**:
  - _Usuario_: cliente1@demo.test / _Password_: Cliente1234! (empresa_id=1)

**Comprobación y logs**

> Importante: desde otra terminal, para no interrumpir el servicio de docker

```bash
docker compose ps
```

**Ver logs**

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

**Parada**

```bash
docker compose down
```

**Reinicializar la BD demo (reaplicar schema + seed):**

```bash
docker compose down -v
docker compose up --build
```

## 8. Despliegue

- **Frontend (Vercel):** https://asesoria-laboral-frontend.vercel.app
- **Backend (Railway):** https://backend-production-583a.up.railway.app

### 8.1 Variable de entorno (frontend)

En Vercel (producción):

- `VITE_API_URL=https://backend-production-583a.up.railway.app`

---

## 9. Endpoints disponibles

### Utilidad

- GET `/health` → estado del servicio
- GET `/db-time` → prueba de conexión a PostgreSQL (SELECT NOW())
- POST `/echo` → devuelve el body recibido

### Auth

- POST `/auth/registro` → registro público (crea CLIENTE, status=PENDIENTE, empresa_id=NULL)
- POST `/auth/login` → login, devuelve JWT (Bearer)

### Scoped (CLIENTE) – requiere JWT

- GET `/me/empresa` → empresa asociada al usuario autenticado
- GET `/me/trabajadores` → trabajadores de su empresa
- GET `/me/incidencias` → incidencias de su empresa
  > Si `empresa_id` no está asignado → 403 `NO_EMPRESA_ASIGNADA`

### Backoffice (GESTOR) – requiere JWT + rol GESTOR

#### Empresas (CRUD)

- GET `/empresas`
- GET `/empresas/:id`
- POST `/empresas`
- PUT `/empresas/:id`
- DELETE `/empresas/:id`

#### Trabajadores (CRUD)

- GET `/trabajadores?empresa_id=<id>`
- GET `/trabajadores/:id`
- POST `/trabajadores`
- PUT `/trabajadores/:id`
- DELETE `/trabajadores/:id`

#### Incidencias (CRUD)

- GET `/incidencias?empresa_id=<id>`
- GET `/incidencias/:id`
- POST `/incidencias`
- PUT `/incidencias/:id`
- DELETE `/incidencias/:id`

#### Usuarios (asignación de empresa a clientes)

- GET `/usuarios?role=CLIENTE` → lista clientes (ordenados: PENDIENTE primero)
- PATCH `/usuarios/:id/asignar-empresa` body `{ "empresa_id": <id> }` → asigna empresa y activa status

---

### GET /db-time

Ejecuta:

```sql
SELECT NOW();
```

Verifica conexión con PostgreSQL.

---

## 10. Scripts disponibles

### Backend

```json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

### Frontend

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## 11. Testing (Backend)

Se incluyen pruebas de integración con Jest + Supertest.

Ejecución:

```bash
cd backend
npm test
```

Ubicación:
backend/\_\_tests\_\_/

Casos cubiertos (resumen):

- Login devuelve token
- 401 sin token en endpoint protegido
- 403 por rol CLIENTE en endpoints de GESTOR
- 403 NO_EMPRESA_ASIGNADA en /me/empresa para usuario PENDIENTE
- POST /incidencias (GESTOR) crea incidencia (201)

---

## 12. Estado actual (Prototipo final)

✔ SPA con rutas públicas y privadas  
✔ Autenticación JWT (roles GESTOR / CLIENTE)  
✔ Endpoints scoped para cliente: /me/empresa, /me/trabajadores, /me/incidencias  
✔ CRUD completo para GESTOR: empresas, trabajadores, incidencias  
✔ UI responsive (Home + área privada) y recursos oficiales enlazados

---

## 13. Autor

David Docampo Trabazo  
CFGS Desarrollo de Aplicaciones Web (DAW)

---

## 14. Licencia y dependencias de terceros

Este proyecto se publica bajo licencia **MIT** (ver archivo [LICENSE](LICENSE)).

Dependencias principales (según `package.json`):

### Frontend

- react
- react-dom
- react-router-dom
- react-icons
- vite
- tailwindcss
- postcss
- autoprefixer
- eslint + plugins

### Backend

- express
- pg (node-postgres)
- cors
- dotenv
- jsonwebtoken
- bcryptjs
- nodemon

### Testing (backend)

- jest
- supertest
- cross-env (Windows)

### Docker (despliegue local)

Para el despliegue local se utiliza Docker Compose.

- Docker Engine: Apache License 2.0.
- Docker Compose (plugin v2): Apache License 2.0.
- Docker Desktop (Windows/macOS): Docker Subscription Service Agreement (herramienta utilizada para ejecutar el motor en local).

Imágenes:

- `postgres:16-alpine` (Docker Official Image) para la base de datos.

> Nota: las licencias exactas de cada dependencia se pueden consultar en sus repositorios oficiales o en el fichero `package-lock.json`.

## 15. Documentación

La documentación técnica y funcional del proyecto se encuentra en:

- [`doc/doc.md`](doc/doc.md)

Incluye: análisis y alcance, diseño (diagramas y wireframes), arquitectura, prototipos (1–3), instalación/puesta en marcha, manual de usuario, pruebas (Thunder + evidencias UI) y propuestas de mejora.

### Exportación a PDF (entrega)

La documentación se exporta a PDF desde VS Code con la extensión **Markdown PDF**:

1. Abrir `doc/doc.md`.
2. Click derecho → **Markdown PDF: Export (pdf)**.
3. Subir el PDF resultante a la tarea correspondiente del aula virtual.

> Nota: las evidencias gráficas usadas en la documentación se encuentran en la carpeta `img/`.

## Guía de contribución

Este proyecto tiene un carácter **académico** y forma parte de un Proyecto Fin de Ciclo. No obstante, cualquier sugerencia de mejora, corrección o ampliación puede proponerse mediante revisiones del código o comentarios, siempre respetando el alcance definido en la documentación.
