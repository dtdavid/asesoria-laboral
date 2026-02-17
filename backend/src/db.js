import pg from "pg"

const { Pool } = pg

// Pool = “piscina” de conexiones reutilizables (rendimiento y buenas prácticas)
export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})
