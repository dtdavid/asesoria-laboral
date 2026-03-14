import jwt from "jsonwebtoken"

/**
 * Middleware de autenticación.
 * Verifica el JWT y expone el payload en req.user.
 */

export function requireAuth(req, res, next) {
  try {
    const auth = req.header("authorization") 
    if (!auth) {
      return res.status(401).json({
        ok: false,
        code: "UNAUTHORIZED",
        message: "Falta token de autenticación",
      })
    }

    const [type, token] = auth.split(" ")
    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        ok: false,
        code: "UNAUTHORIZED",
        message: "Formato de token inválido (usa Bearer)",
      })
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload 
    return next()
  } catch (err) {
    return res.status(401).json({
      ok: false,
      code: "UNAUTHORIZED",
      message: "Token inválido o caducado",
    })
  }
}