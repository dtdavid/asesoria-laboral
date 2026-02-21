import { getEmpresas, createEmpresa, deleteEmpresaById } from "../services/empresas.service.js"

/**
 * Controller de empresas.
 * Gestiona la capa HTTP (req/res) y delega la lógica al service.
 */

/**
 * GET /empresas
 * Devuelve el listado de empresas.
 */

export async function listEmpresas(_req, res, next) {
  try {
    const empresas = await getEmpresas()
    res.status(200).json({ ok: true, data: empresas })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /empresas
 * Crea una nueva empresa.
 * - Valida campos obligatorios
 * - Devuelve 201 si se crea correctamente
 * - Devuelve 409 si el CIF ya existe
 */

export async function addEmpresa(req, res, next) {
  try {
    const { razon_social, cif } = req.body || {}

    // Validación mínima
    if (!razon_social || !cif) {
      return res.status(400).json({
        ok: false,
        error: "Campos obligatorios: razon_social, cif",
      })
    }

    const nueva = await createEmpresa(req.body)

    return res.status(201).json({
      ok: true,
      data: nueva,
    })
  } catch (err) {
    // Código de error de PostgreSQL para violación de UNIQUE
    // 23505 = unique_violation
    if (err?.code === "23505") {
      return res.status(409).json({
        ok: false,
        error: "Ya existe una empresa con ese CIF",
      })
    }

    next(err)
  }
}

/**
 * DELETE /empresas/:id
 * Elimina una empresa por ID.
 */
export async function removeEmpresa(req, res, next) {
  try {
    const id = Number(req.params.id)

    if (!id || Number.isNaN(id)) {
      return res.status(400).json({
        ok: false,
        error: "ID inválido"
      })
    }

    const deleted = await deleteEmpresaById(id)

    if (deleted === 0) {
      return res.status(404).json({
        ok: false,
        error: "Empresa no encontrada"
      })
    }

    return res.status(204).send()
  } catch (err) {
    next(err)
  }
}
