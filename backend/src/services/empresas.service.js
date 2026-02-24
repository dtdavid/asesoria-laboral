import { pool } from "../db.js"

/**
* Service de empresas.
 * Contiene la lógica de acceso a datos (consultas SQL).
 * No gestiona HTTP ni req/res.
 */


/**
 * Obtiene el listado de empresas ordenadas por fecha de creación.
 * @returns {Promise<Array>} Array de empresas
 */

export async function getEmpresas() {
  const result = await pool.query(
    `SELECT id, razon_social, cif, ciudad, provincia, activa
     FROM empresas
     ORDER BY created_at ASC`
  )
  return result.rows
}

/**
 * Obtiene una empresa por ID.
 * @export
 * @param {number} id - ID de la empresa
 * @returns {Promise<Object|null>} Empresa encontrada o null si no existe
 */
export async function getEmpresaById(id) {
  const result = await pool.query(
    `SELECT id, razon_social, cif, ciudad, provincia, activa
     FROM empresas
     WHERE id = $1`,
    [id]
  )
  return result.rows[0] || null
}

/**
 * Inserta una nueva empresa en la base de datos.
 * @param {Object} payload - Datos de la empresa
 * @returns {Promise<Object>} Empresa creada
 */

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

/**
 * 
 * @param {number} id - ID de la empresa
 * @returns {Promise<number>} Número de filas eliminadas
 */

export async function deleteEmpresaById(id) {
  const result = await pool.query(
    `DELETE FROM empresas WHERE id = $1`,
    [id]
  )

  return result.rowCount  //rowCount = 0 si no se ha eliminado nada (404), 1 si se ha eliminado una fila (204)
}


/**
 * Actualiza una empresa por ID.
 * @param {number} id - ID de la empresa
 * @param {Object} payload - Datos a actualizar
 * @returns {Promise<Object|null>} Empresa actualizada o null si no existe
 */
export async function updateEmpresaById(id, payload) {
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
    `UPDATE empresas
     SET
       razon_social = $1,
       cif = $2,
       nombre_comercial = $3,
       direccion = $4,
       codigo_postal = $5,
       ciudad = $6,
       provincia = $7,
       pais = $8,
       telefono = $9,
       email = $10,
       codigo_cuenta_cotizacion = $11,
       convenio_colectivo = $12,
       sector_actividad = $13,
       activa = $14,
       updated_at = NOW()
     WHERE id = $15
     RETURNING id, razon_social, cif, ciudad, provincia, activa, created_at, updated_at`,
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
      id,
    ]
  )

  return result.rows[0] || null
}
