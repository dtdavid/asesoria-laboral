import express from "express"
import cors from "cors"
import empresasRoutes from "./routes/empresas.routes.js"
import trabajadoresRoutes from "./routes/trabajadores.routes.js"
import { pool } from "./db.js"



const app = express()

// Middlewares globales
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

app.get("/db-time", async (_req, res, next) => {
  try {
    const result = await pool.query("SELECT NOW() AS now")
    res.status(200).json({ ok: true, now: result.rows[0].now })
  } catch (err) {
    next(err) // lo manda al error handler global
  }
})

app.post("/echo", (req, res) => {
  res.status(200).json({
    received: req.body
  })
})


// Monta el router de empresas bajo el prefijo /empresas

app.use("/empresas", empresasRoutes)

//Monta el router de trabajadores bajo el prefijo /trabajadores
app.use("/trabajadores", trabajadoresRoutes)

// Handler de rutas no existentes (404 de API)
app.use((_req, res) => {
  res.status(404).json({ ok: false, error: "Not Found" })
})


//middleware de error (err, req, res, next)
// Handler de errores global (captura errores lanzados en rutas/middlewares)
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ ok: false, error: "Internal Server Error" })
})
// -> CAMBIAR AL SIGUIENTE CÓDIGO CUANDO ESTÉN TODOS LOS CONTROLADORES CON MESSAGES Y CODES EN LOS ERRORES
// app.use((err, _req, res, _next) => {
//   console.error(err)
//   res.status(500).json({
//     ok: false,
//     code: "INTERNAL_ERROR",
//     message: "Internal Server Error",
//   })
// })

export default app



