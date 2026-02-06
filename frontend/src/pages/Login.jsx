import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Login() {

  const navigate= useNavigate()
  const { login } = useAuth()

  const handleLogin = () => {
    login() // actualizamos el estado de autenticación en el contexto
    navigate('/app') // redirigimos a la ruta protegida después de iniciar sesión
  }
  
  return (
    <main>
      <h2>Login</h2>
      <p>Página de acceso de los usuarios registrados.</p>
      <button type="button" onClick={handleLogin}>Simulate login</button>
    </main>
  )
}
