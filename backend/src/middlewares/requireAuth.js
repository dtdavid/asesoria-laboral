import jwt from "jsonwebtoken"

// Middleware para proteger rutas que requieren autenticación
// Verifica que el token JWT esté presente y sea válido, y adjunta la información del usuario al objeto req.user para que los controladores puedan acceder a ella.
//leer hearer authorization 
//verificar formato "Bearer <token>"
// verificar token con jwt.verify
// Si el token es válido, extraer payload y asignar a req.user 
// manejar errores de token faltante, formato inválido o token inválido/caducado.  
// luego llamar a next() para continuar con la ejecución del controlador.

export function requireAuth(req, res, next) {
  try {
    const auth = req.header("authorization") // "Bearer <token>"
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
    req.user = payload // { user_id, role, status, empresa_id, iat, exp }
    return next()
  } catch (err) {
    return res.status(401).json({
      ok: false,
      code: "UNAUTHORIZED",
      message: "Token inválido o caducado",
    })
  }
}