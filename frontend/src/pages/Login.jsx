import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Button from "../components/ui/Button"
import { API_URL } from "../config/api"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  // Estado del formulario
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Validación mínima (frontend)
  const isValidEmail = email.includes("@") && email.includes(".")
  const isValidPassword = password.length >= 8
  const canSubmit = isValidEmail && isValidPassword

  const handleSubmit = async (e) => {
  e.preventDefault()
  setError("")

  if (!canSubmit) {
    setError("Por favor, introduce un email válido y una contraseña de al menos 8 caracteres.")
    return
  }

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok || !data?.ok) {
      throw new Error(data?.message || data?.error || "Credenciales inválidas")
    }

    // tu response: { ok:true, data: { token, user } }
    login({ token: data.data.token, user: data.data.user })
    navigate("/app", { replace: true })
  } catch (err) {
    setError(err?.message || "Error inesperado")
  }
}

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl bg-brand-surface p-4 sm:p-6">
      <div className="rounded-2xl bg-white p-8 shadow-sm space-y-6">

        <header className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold text-brand-text">Login</h2>
          <p className="text-sm text-brand-muted">
            Acceso de usuarios registrados.
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
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              autoComplete="current-password"
              className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
            />
            <p className="text-xs text-brand-muted">Mínimo 8 caracteres</p>
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

          <p className="text-xs text-brand-muted text-center">
            Acceso con credenciales.
          </p>
        </form>
      </div>
      </div>
    </div>
  )
}


