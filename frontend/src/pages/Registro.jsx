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

  const handleSubmit = (e) => {
    e.preventDefault() // evita que el navegador recargue la página
    setError("") // reseteamos el error antes de intentar registrar

    if (!canSubmit) {
      setError(
        "Por favor, introduce un email válido, una contraseña de al menos 6 caracteres y asegúrate de que las contraseñas coinciden."
      )
      return
    }

    //Registro simulado: en el futuro será API + JWT
    login() // marcamos autenticado para poder acceder a /app
    navigate("/app", { replace: true })
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl bg-brand-surface p-4 sm:p-6">
      <div className="rounded-2xl bg-white p-8 shadow-sm space-y-6">
        <header className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-brand-text">Registro</h2>
          <p className="text-sm text-brand-muted">
            Página para registrarse como nuevo usuario.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-brand-text">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@correo.com"
              autoComplete="email"
              className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-brand-text">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              autoComplete="new-password"
              className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
            />
            <p className="text-xs text-brand-muted">Mínimo 8 caracteres</p>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-brand-text"
            >
              Repetir contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="******"
              autoComplete="new-password"
              className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
            />
            <p className="text-xs text-brand-muted">
              Debe coincidir con la contraseña
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" disabled={!canSubmit} className="w-full">
            Registrarse
          </Button>

          <p className="text-xs text-brand-muted text-center">
            Nota: registro simulado. En próximos prototipos se conectará con backend y JWT.
          </p>
        </form>
      </div>
      </div>
    </div>
  )
}

      
