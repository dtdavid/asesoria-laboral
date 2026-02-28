import { getEmpresas, getEmpresaById, createEmpresa, deleteEmpresaById, updateEmpresaById } from "../services/empresas.service.js"

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
 *
 * @export
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @return {Promise<void>} 
 */
export async function getEmpresa(req, res, next) {
  //en "req" espero un parámetro id (req.params.id) que es el ID de la empresa a obtener
  try {
    //valido ese "id" para asegurarme de que es un número entero positivo
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        code: "VALIDATION_ERROR",
        message: "ID inválido",
        details: { field: "id", value: req.params.id },
        //error: "ID inválido"
      })
    }
    //llamo a getEmpresaById(id) para obtener la empresa de la base de datos
    const empresa = await getEmpresaById(id)
    if (!empresa) {
      return res.status(404).json({ 
        ok: false,
        code: "NOT_FOUND",
        message: "Empresa no encontrada",
        details: { id },
        //error: "Empresa no encontrada"
      })
    }
    return res.status(200).json({ ok: true, data: empresa })
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
        code: "VALIDATION_ERROR",
        message:" Campos obligatorios: razon_social, cif",
        details:{fields:["razon_social", "cif"]},
        //error: "Campos obligatorios: razon_social, cif",
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
        code: "CIF_DUPLICADO",
        message: "Ya existe una empresa con ese CIF",
        details: { field: "cif" },
        //error: "Ya existe una empresa con ese CIF"
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
    // Validación defensiva para evitar DELETE con id inválido o manipulaciones en URL
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        code: "VALIDATION_ERROR",
        message: "ID inválido",
        details: { field: "id" },
        //error: "ID inválido"
      })
    }

    const deleted = await deleteEmpresaById(id)

    if (deleted === 0) {
      return res.status(404).json({
        ok: false,
        code: "NOT_FOUND",
        message: "Empresa no encontrada",
        details: { id },
        //error: "Empresa no encontrada"
      })
    }

    return res.status(204).send()
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /empresas/:id
 * Actualiza una empresa por ID.
 */
export async function editEmpresa(req, res, next) {
  try {
    const id = Number(req.params.id)
    if (!id || Number.isNaN(id)) {
      return res.status(400).json({ ok: false, error: "ID inválido" })
    }

    const { razon_social, cif } = req.body || {}
    if (!razon_social || !cif) {
      return res.status(400).json({
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Campos obligatorios: razon_social, cif",
        details: { fields: ["razon_social", "cif"] },
        //error: "Campos obligatorios: razon_social, cif"

      })
    }

    const updated = await updateEmpresaById(id, req.body)

    if (!updated) {
      return res.status(404).json({
        ok: false, 
        code: "NOT_FOUND",
        message: "Empresa no encontrada",
        details: { id },
        //error: "Empresa no encontrada"
      })
    }

    return res.status(200).json({ ok: true, data: updated })
  } 
  catch (err) {
    if (err?.code === "23505") {
      return res.status(409).json({ 
        ok: false, 
        code: "CIF_DUPLICADO",
        message: "Ya existe una empresa con ese CIF",
        details: { field: "cif" },
        //error: "Ya existe una empresa con ese CIF"
      })
    }
    next(err)
  }
}

