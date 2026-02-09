import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Button from "../components/ui/Button"
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
    <div className="max-w-2xl mx-auto space-y-4 text-center">

      <div className="space-y-2">
        <p className="text-sm font-medium">Área privada</p>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-sm">Área privada del usuario autenticado.</p>
      </div>

      <div >
        {/* <button 
        type="button"
        className=" rounded border px-6 py-2 bg-gray-500 text-white hover:bg-gray-600" 
        onClick={handleLogout}
        >
        Cerrar Sesión</button> */}

        <Button
        type="button"
        onClick={handleLogout}
        >
        Cerrar Sesión
        </Button>
      </div>

    </div>
  )
}
