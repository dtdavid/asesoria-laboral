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
    //estado global: indica si el usuario está autenticado
    //se inicializa leyendo localStorage para mantener sesión tras recargar. 
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const saved = localStorage.getItem("isAuthenticated")
        return saved === "true"
    })

    //login simulado: actualiza estado y persiste la sesión en localStorage
    //En el futuro, aquí guardaremos el token JWT 
    const login = () => {
        setIsAuthenticated(true)
        localStorage.setItem("isAuthenticated", "true")
    }
    //Logout simulado: limpia estado y persiste el cierre de sesión
    //En el futuro, aquí eliminaremos el token JWT
    const logout = () => {
        setIsAuthenticated(false)
        localStorage.setItem("isAuthenticated", "false")
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
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
  
