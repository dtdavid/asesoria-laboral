import express from "express"
import cors from "cors"
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


// Handler de rutas no existentes (404 de API)
app.use((_req, res) => {
  res.status(404).json({ ok: false, error: "Not Found" })
})

// Handler de errores global (captura errores lanzados en rutas/middlewares)
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ ok: false, error: "Internal Server Error" })
})

export default app



