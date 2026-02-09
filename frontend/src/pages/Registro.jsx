import Button from "../components/ui/Button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Registro() {

  const navigate = useNavigate()
  const { login } = useAuth() // iniciamos sesión automáticamente al registrarnos (simulación)

// Estado del formulario

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

// Validación mínima (frontend)

  const isValidEmail = email.includes("@") && email.includes(".")
  const isValidPassword = password.length >= 6
  const passwordsMatch = password === confirmPassword
  const canSubmit = isValidEmail && isValidPassword && passwordsMatch

  const handletSubmit = (e) => {
    e.preventDefault() // evita que el navegador recargue la página
    setError("") // reseteamos el error antes de intentar registrar

    if(!canSubmit) {
      setError("Por favor, introduce un email válido, una contraseña de al menos 6 caracteres y asegúrate de que las contraseñas coinciden.")
      return
    }

    //Registro simulado: en el futuro será API + JWT
    login() // marcamos autenticado para poder acceder a /app
    navigate("/app", { replace: true })
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <header  className="text-center space-y-2">
      <h2 className="text-2xl font-semibold">Registro</h2>
      <p className="text-sm text-gray-600">Página para registrarse como nuevo usuario.</p>
      </header>

      <form onSubmit={handletSubmit}  className="space-y-4 border rounded p-4">

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
          <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            autoComplete="new-password"
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
        </div>

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-sm font-medium">Repetir contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="******"
            autoComplete="new-password"
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <p className="text-xs text-gray-500">Debe coincidir con la contraseña</p>
        </div>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <Button 
        type="submit" 
        disabled={!canSubmit} 
        className="w-full">
        Registrarse
        </Button>

        <p className="text-xs text-gray-500">
          Nota: registro simulado. En próximos prototipos se conectará con backend y JWT.
        </p>

      </form>
    </div >
  )
}
      
