import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

/**
 * Página principal del área privada
 * Por ahora es solo un placeholder
 */

export default function Dashboard() {

  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Área privada del usuario autenticado.</p>
      <button type="button" onClick={handleLogout}>Cerrar Sesión</button>
    </section>
  )
}
