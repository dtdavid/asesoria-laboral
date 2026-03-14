import express from "express"
import cors from "cors"
import { pool } from "./db.js"
import empresasRoutes from "./routes/empresas.routes.js"
import trabajadoresRoutes from "./routes/trabajadores.routes.js"
import authRoutes from "./routes/auth.routes.js"
import meRoutes from "./routes/me.routes.js"
import usuariosRoutes from "./routes/usuarios.routes.js"
import incidenciasRoutes  from "./routes/incidencias.routes.js"

const app = express()


app.use(cors())
app.use(express.json())


// Health check: comprueba que el servicio responde
app.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "backend",
    ts: new Date().toISOString(),
  })
})

// Comprueba conexión con la base de datos
app.get("/db-time", async (_req, res, next) => {
  try {
    const result = await pool.query("SELECT NOW() AS now")
    res.status(200).json({ ok: true, now: result.rows[0].now })
  } catch (err) {
    next(err) 
  }
})

app.use("/empresas", empresasRoutes)
app.use("/trabajadores", trabajadoresRoutes)
app.use("/auth", authRoutes)
app.use("/me", meRoutes)
app.use("/usuarios", usuariosRoutes)
app.use("/incidencias", incidenciasRoutes)

// Handler de rutas no existentes (404 de API)
app.use((_req, res) => {
  res.status(404).json({ 
    ok: false, 
    code: "NOT_FOUND",
    message: "Ruta no encontrada"
   })
})

// Handler de errores global (captura errores lanzados en rutas/middlewares)
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ 
    ok: false, 
    code: "INTERNAL_ERROR",
    message: "Internal Server Error"
  })
})


export default app



