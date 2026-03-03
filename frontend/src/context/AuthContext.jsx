import {createContext, useContext, useState} from 'react'

/**
 * Contexto de autentificación simulado
 * más adelante, la autentificación será real con JWT + backend
 */
 
const AuthContext = createContext(null)

/**
 * Provider: envuelve la app y comparte el estado de autentificación.
 */
export function AuthProvider({children}) {
    // Estado de autentificación: token, user, isAuthenticated
    // la función de inicialización de useState lee el token y user del localStorage para mantener la sesión entre recargas
    const [token, setToken] = useState(() => localStorage.getItem("token") || "")
    const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user")
    return raw ? JSON.parse(raw) : null
  })

    //isAuthenticated se calcula a partir de la existencia de un token válido 
    const isAuthenticated = Boolean(token)

    //login con JWT: guarda token y user en estado y localStorage 
    const login = ({ token: newToken, user: newUser }) => {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem("token", newToken)
    localStorage.setItem("user", JSON.stringify(newUser))
  }
    //Logout con JWT: limpia estado y localStorage
    const logout = () => {
    setToken("")
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

/**
 * 
 * Hook para acceder al contexto
 */
export function useAuth() {

    const contextValue = useContext(AuthContext)
    
    if(!contextValue) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider')
    }
    return contextValue
}
  
