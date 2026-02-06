import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
/**
 * Componente de ruta protegida
 * En el futuro se utilizará para proteger rutas privadas con autenticación JWT
 */

export default function ProtectedRoute() {

    // leemos el estado de autenticación desde el contexto (simulado en esta fase)
    // En fases posteriores se leerá el estado de autenticación real con JWT + backend
    const {isAuthenticated} = useAuth()

    // si no está autenticado, rederigimos a /login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>
    }
    // si está autenticado,dejamos pasar a la ruta protegida
        return (
            <Outlet />
        )
}
