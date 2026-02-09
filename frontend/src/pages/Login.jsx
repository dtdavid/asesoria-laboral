import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Button from "../components/ui/Button"

export default function Login() {

  const navigate= useNavigate()
  const { login } = useAuth()
  
  // Estado del formulario

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Validación mínima (frontend)

  const isValidEmail = email.includes("@") && email.includes(".")
  const isValidPassword = password.length >= 6
  const canSubmit = isValidEmail && isValidPassword


  const handleSubmit = (e) => {
    e.preventDefault() // evita que el navegador recargue la página
    setError("") // reseteamos el error antes de intentar loguear

    // Aquí iría la lógica real de autenticación, por ejemplo una llamada a una API
    // Por ahora simulamos un login exitoso con cualquier email y password válidos
    if(!canSubmit) {
      setError("Por favor, introduce un email válido, una contraseña de al menos 6 caracteres y asegúrate de que las contraseñas coinciden.")
     return
    }
      // Login simulado (más adelante será API + JWT)
      login()
      navigate("/app", { replace: true })
    }
  
    return (
    <div className="max-w-md mx-auto space-y-6">

      <header className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Login</h2>
        <p className="text-sm">Acceso de usuarios registrados (simulado).</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 border rounded p-4">

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@correo.com"
            autoComplete="email"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            autoComplete="current-password"
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
        </div>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <Button 
        type="submit" 
        disabled={!canSubmit}
        className="w-full"
        >
        Iniciar sesión
        </Button>

        <p className="text-xs text-gray-500">
          Nota: login simulado. En próximos prototipos se conectará con backend y JWT.
        </p>
      </form>

    </div>
  )
}

