import { pool } from "../db.js"

/**
 * Service de empresas: capa de acceso a datos (BD)
 * Aquí viven las consultas SQL.
 */

export async function getEmpresas() {
  const result = await pool.query(
    `SELECT id, razon_social, cif, ciudad, provincia, activa
     FROM empresas
     ORDER BY created_at DESC`
  )
  return result.rows
}
