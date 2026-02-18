“Work in progress. README will be completed during final delivery.”

# Aplicación Web – Asesoría Laboral

Proyecto Fin de Ciclo (DAW)

Aplicación web académica orientada a la gestión interna de una asesoría laboral.  
Permite organizar empresas, trabajadores e incidencias laborales.

---

# 1. Tecnologías utilizadas

## Frontend

- React
- Vite
- React Router
- Tailwind CSS
- React Icons
- PostCSS
- Autoprefixer

## Backend

- Node.js
- Express
- PostgreSQL
- pg (node-postgres)
- dotenv
- cors
- nodemon

---

# 2. Estructura del repositorio

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

# 3. Requisitos previos

- Node.js (LTS)
- npm
- Git
- PostgreSQL instalado en local
- Base de datos creada: `asesoria_laboral`

---

# 4. Instalación

## 4.1 Clonar repositorio

```bash
git clone https://gitlab.iessanclemente.net/dawd/a25daviddt.git
cd a25daviddt
```

---

## 4.2 Instalación del frontend

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

## 4.3 Instalación del backend

```bash
cd backend
npm install
```

---

# 5. Variables de entorno

Archivo plantilla:

```
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
```

Para desarrollo:

1. Copiar `.env.example`
2. Renombrar a `.env`
3. Configurar credenciales reales

⚠️ `.env` está ignorado en `.gitignore`.

---

# 6. Creación de la base de datos

Desde `psql`:

```sql
CREATE DATABASE asesoria_laboral;
```

Comprobar:

```sql
\l
```

---

# 7. Arranque del backend

```bash
npm run dev
```

Backend disponible en:

```
http://localhost:3000
```

---

# 8. Endpoints disponibles

## GET /health

Comprueba que la API está operativa.

Respuesta ejemplo:

```json
{
  "ok": true,
  "service": "backend",
  "ts": "2026-02-16T22:33:11.005Z"
}
```

---

## GET /db-time

Ejecuta:

```sql
SELECT NOW();
```

Verifica conexión con PostgreSQL.

---

## POST /echo

Devuelve el body recibido.

Ejemplo:

```json
{
  "received": {
    "mensaje": "hola"
  }
}
```

---

# 9. Scripts disponibles

## Backend

```json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

## Frontend

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

# 10. Estado actual (Prototipo 1)

✔ SPA con rutas públicas y privadas  
✔ Layout público y privado  
✔ Autenticación simulada  
✔ Backend Express operativo  
✔ Conexión verificada con PostgreSQL  
✔ Base preparada para JWT

---

# 11. Documentación

La documentación técnica completa se encuentra en:

```
doc/doc.md
```

Incluye análisis, diseño, arquitectura y referencias externas.

---

# 12. Autor

David Docampo Trabazo  
CFGS Desarrollo de Aplicaciones Web (DAW)

---

# 13. Licencia

Proyecto académico bajo licencia MIT.

> _TODO_: Brevísimamente. Indica qué licencia usarás y crea un link a ella. Hay miles de ejemplos en Github.
> _TODO_: Es requisito INDISPENSABLE el licenciar explícitamente el proyecto software. Se recomienda licenciar con _MIT License_ (como viene en la plantilla) o _GNU Free Documentation License Version 1.3_. Presencia de un fichero `LICENSE` en la raiz del repo, con tu fichero de licencia. Recuerda que si empleas una licencia de software libre estás autorizando la derivación de tu obra bajo la misma licencia que elijas, pudiendo dar continuidad, p. e. otro alumno, para continuar tu proyecto en otro curso.
> Si tu proyecto tiene además otro tipo contenido documental, recomendamos los términos de _GNU Free Documentation License Version 1.3_, crea igualmente el fichero `LICENSE`. Será especialmente valorado en este caso, la claridad de la especificación para que el proyecto pueda ser ejecutado partiendo de lo proyectado.
> Ten en cuenta que estás cediendo el uso de este software y sus subproductos generados a la comunidad.

## Documentación

> _TODO_: Emplaza a quien se haya interesado en tu proyecto a leer una guía o documentación extendida del mismo. Haz un link a ella en este punto.

## Documentación

La documentación técnica y funcional del proyecto se encuentra desarrollada en un documento independiente, donde se detallan el análisis, el diseño, la planificación y las decisiones técnicas adoptadas.

Puede consultarse en el siguiente enlace:

[Documentación del proyecto](doc/doc.md)

## Guía de contribución

Este proyecto tiene un carácter **académico** y forma parte de un Proyecto Fin de Ciclo. No obstante, cualquier sugerencia de mejora, corrección o ampliación puede proponerse mediante revisiones del código o comentarios, siempre respetando el alcance definido en la documentación.

> _TODO_: Tratándose de un proyecto de software libre, es muy importante que expongas cómo se puede contribuir con tu proyecto. Algunos ejemplos de esto son realizar nuevas funcionalidades, corrección y/u optimización del código, realización de tests automatizados, nuevas interfaces de integración, desarrollo de plugins, etc. etc. Sé lo más conciso que puedas.
