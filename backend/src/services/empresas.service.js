import { pool } from "../db.js"

/**
 * Service de empresas: capa de acceso a datos (BD)
 * Aquí viven las consultas SQL.
 */


{/* FUNCIÓN DE CONSULTA */}

export async function getEmpresas() {
  const result = await pool.query(
    `SELECT id, razon_social, cif, ciudad, provincia, activa
     FROM empresas
     ORDER BY created_at DESC`
  )
  return result.rows
}

{/*FUNCIÓN INSERT */}

export async function createEmpresa(payload) {
  const {
    razon_social,
    cif,
    nombre_comercial = null,
    direccion = null,
    codigo_postal = null,
    ciudad = null,
    provincia = null,
    pais = "España",
    telefono = null,
    email = null,
    codigo_cuenta_cotizacion = null,
    convenio_colectivo = null,
    sector_actividad = null,
    activa = true,
  } = payload

  const result = await pool.query(
    `INSERT INTO empresas (
      razon_social, cif, nombre_comercial,
      direccion, codigo_postal, ciudad, provincia, pais,
      telefono, email,
      codigo_cuenta_cotizacion, convenio_colectivo, sector_actividad,
      activa
    ) VALUES (
      $1,$2,$3,
      $4,$5,$6,$7,$8,
      $9,$10,
      $11,$12,$13,
      $14
    )
    RETURNING id, razon_social, cif, ciudad, provincia, activa, created_at`,
    [
      razon_social,
      cif,
      nombre_comercial,
      direccion,
      codigo_postal,
      ciudad,
      provincia,
      pais,
      telefono,
      email,
      codigo_cuenta_cotizacion,
      convenio_colectivo,
      sector_actividad,
      activa,
    ]
  )

  return result.rows[0]
}

