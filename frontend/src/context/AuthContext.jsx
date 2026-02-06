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
    //estado: "estoy logueado"
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // acciones simuladas
    const login = () => setIsAuthenticated(true)
    const logout = () => setIsAuthenticated(false)

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
  
