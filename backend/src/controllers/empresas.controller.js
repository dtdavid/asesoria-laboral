import { getEmpresas, createEmpresa } from "../services/empresas.service.js"

/**
 * Controller: capa HTTP.
 * Se encarga de responder a la petición usando el service.
 */

export async function listEmpresas(_req, res, next) {
  try {
    const empresas = await getEmpresas()
    res.status(200).json({ ok: true, data: empresas })
  } catch (err) {
    next(err)
  }
}


export async function addEmpresa(req, res, next) {
  try {
    const { razon_social, cif } = req.body || {}

    // Validación mínima (Prototipo 1)
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