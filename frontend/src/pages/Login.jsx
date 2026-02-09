import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Button from "../components/ui/Button"

export default function Login() {

  const navigate= useNavigate()
  const { login } = useAuth()

  const handleLogin = () => {
    login() // actualizamos el estado de autenticación en el contexto
    navigate('/app') // redirigimos a la ruta protegida después de iniciar sesión
  }
  
  return (
    <div className="max-w-md mx-auto space-y-4 text-center">

      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Login</h2>
        <p className="text-sm">Página de acceso de los usuarios registrados.</p>
      </div>

      <div >
        {/* <button 
        className="rounded border px-6 py-2 bg-gray-500 text-white hover:bg-gray-600"
        type="button" onClick={handleLogin}
        >Simulate login</button> */}
        <Button 
        type="button" 
        onClick={handleLogin}
        className="w-full"
        >
        Simulate login
        </Button>
      </div>

    </div>
  )
}
