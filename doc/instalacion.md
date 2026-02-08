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
