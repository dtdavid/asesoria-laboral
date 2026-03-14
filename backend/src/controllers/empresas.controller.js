import { getEmpresas, getEmpresaById, createEmpresa, deleteEmpresaById, updateEmpresaById } from "../services/empresas.service.js"


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
 * GET /empresas/:id
 * obtener empresa por id  
 */
export async function getEmpresa(req, res, next) {
  
  try {
    
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        code: "VALIDATION_ERROR",
        message: "ID de empresa inválido",
        details: { field: "id", value: req.params.id },
        //error: "ID inválido"
      })
    }
    
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
    const missingFields = ["razon_social", "cif"].filter(
      (field) => !req.body?.[field]
    )

    if (missingFields.length > 0) {
      return res.status(400).json({
        ok: false,
        code: "VALIDATION_ERROR",
        message: `Campos obligatorios: ${missingFields.join(", ")}`,
        details: { fields: missingFields },
      })
    }

    const nueva = await createEmpresa(req.body)

    return res.status(201).json({
      ok: true,
      data: nueva,
    })
  } catch (err) {
    if (err?.code === "23505") {
      return res.status(409).json({
        ok: false,
        code: "CIF_DUPLICADO",
        message: "Ya existe una empresa con ese CIF",
        details: { field: "cif" },
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
    
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        ok: false,
        code: "VALIDATION_ERROR",
        message: "ID de empresa inválido",
        details: { 
          field: "id",
          value: req.params.id },
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
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          ok: false,
          code: "VALIDATION_ERROR",
          message: "ID de empresa inválido",
          details: { 
            field: "id", 
            value: req.params.id },
        })
      }

    const missingFields = ["razon_social", "cif"].filter(
      (field) => !req.body?.[field]
    )

    if (missingFields.length > 0) {
      return res.status(400).json({
        ok: false,
        code: "VALIDATION_ERROR",
        message: `Campos obligatorios: ${missingFields.join(", ")}`,
        details: { fields: missingFields },
      })
    }

    const updated = await updateEmpresaById(id, req.body)

    if (!updated) {
      return res.status(404).json({
        ok: false,
        code: "NOT_FOUND",
        message: "Empresa no encontrada",
        details: { id },
      })
    }

    return res.status(200).json({ ok: true, data: updated })
  } catch (err) {
    if (err?.code === "23505") {
      return res.status(409).json({
        ok: false,
        code: "CIF_DUPLICADO",
        message: "Ya existe una empresa con ese CIF",
        details: { field: "cif" },
      })
    }
    next(err)
  }
}

