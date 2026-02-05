import {Navigate, Outlet} from 'react-router-dom'

/**
 * Componente de ruta protegida
 * En el futuro se utilizará para proteger rutas privadas con autenticación JWT
 */

export default function ProtectedRoute() {

    // Simulamos que el usuario no está autenticado (en el futuro se comprobará el token JWT)
    const isAuthenticated = false

    // si no está autenticado, rederigimos a /login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>
    }
    // si está autenticado,dejamos pasar a la ruta protegida
        return (
            <Outlet />
        )
}
