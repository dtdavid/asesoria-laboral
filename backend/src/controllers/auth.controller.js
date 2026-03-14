import { getUserByEmail, createUser } from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Controller de autenticación.
 * Gestiona registro y login.
 */



/**
 * POST /auth/register
 * Registra un nuevo usuario. 
 */
export async function register(req, res, next) {
    
    try {
        const { email, password } = req.body || {}
        if(!email || !password) {
            return res.status(400).json({ 
                ok: false,
                code: "VALIDATION_ERROR",
                message: "Email y contraseña son requeridos",
                details: { missing_fields: ["email", "password"].filter(f => !req.body[f]) },
                //error: "Email y contraseña son requeridos"
            })
        }
        if(!email.includes("@")){
            return res.status(400).json({ 
                ok: false,
                code: "VALIDATION_ERROR",
                message: "Email no es válido",
                details: { field: "email", value: email },
                //error: "Email no es válido"
            })
        }
        if(password.length < 8){
            return res.status(400).json({ 
                ok: false,
                code: "VALIDATION_ERROR",
                message: "Contraseña debe tener al menos 8 caracteres",
                details: { field: "password", value: password.length },
                //error: "Contraseña debe tener al menos 8 caracteres"
            })
        }
        const user = await createUser({
            email,
            password_hash: await bcrypt.hash(password, 10)
        })
        return res.status(201).json({
            ok: true,
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
                status: user.status,
                empresa_id: user.empresa_id
            }}
        )
    } 
    catch (error) {
        if(error?.code === "23505"){
            return res.status(409).json({
                ok: false,
                code: "EMAIL_DUPLICADO",
                message: "El email ya está registrado",
                details: { field: "email", value: req.body.email },
                //error: "El email ya está registrado"
            })
        }
            next(error)
        
        
    }
}

/**
 * POST /auth/login 
 * Autentica un usuario y devuelve un JWT.
 */

export async function login(req, res, next) {

    try {
        //validar email y password
        const { email, password } = req.body || {}
        if(!email || !password) {
            return res.status(400).json({ 
                ok: false,
                code: "VALIDATION_ERROR",
                message: "Email y contraseña son requeridos",
                details: { missing_fields: ["email", "password"].filter(f => !req.body[f]) },
                //error: "Email y contraseña son requeridos"
            })
        }
        //obtener usuario por email
        const user = await getUserByEmail(email)
        if(!user){
            return res.status(401).json({
                ok: false,
                code: "INVALID_CREDENTIALS",
                message: "Email o contraseña incorrectos",            
                //error: "Email o contraseña incorrectos"
            })
        }
        //comparar password con el hash almacenado
        const passwordMatch = await bcrypt.compare(password, user.password_hash)

        if(!passwordMatch){
            return res.status(401).json({
                ok: false,
                code: "INVALID_CREDENTIALS",
                message: "Email o contraseña incorrectos",    
                //error: "Email o contraseña incorrectos"
            })
        }
        //generar token JWT
        
        const token = jwt.sign(
            { user_id: user.id, role: user.role, status: user.status, empresa_id: user.empresa_id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        return res.status(200).json({
            ok: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    status: user.status,
                    empresa_id: user.empresa_id
                }
            }
        })
    } 
    catch (error) {
        next(error)
    }


}