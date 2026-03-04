import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../components/ui/Button"
import { apiFetch } from "../lib/apiFetch"
import { useAuth } from "../context/AuthContext"

/**
 * Vista detalle (solo lectura) de un trabajador.
 * - CLIENTE: ve los trabajadores de su empresa (si intenta otra, backend lo bloqueará cuando uses /me/empresa)
 * - GESTOR: puede ver cualquier trabajador por id
 */


export default function TrabajadorDetalle() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { user, token } = useAuth()
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
    if (!token) return

    const load = async () => {
      try {
        setLoading(true)
        setError("")

        // CLIENTE: usamos /me/trabajadores 
        // GESTOR: usamos /trabajadores/:id
        const isCliente = user?.role === "CLIENTE"
        if (isCliente) {
  const data = await apiFetch("/me/trabajadores") // { ok:true, data:[...] }
  const found = (data?.data || []).find((t) => String(t.id) === String(id))
  setItem(found || null)
} else {
  const data = await apiFetch(`/trabajadores/${id}`) // { ok:true, data:{...} }
  setItem(data?.data || null)
}
      } catch (err) {
        setError(err?.message || "No se pudo cargar el trabajador.")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [token, user?.role, id])

    if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-brand-muted">Cargando trabajador…</p>
      </div>
    )
  }
    if (error) {
        return (
          <div className="rounded-2xl bg-white p-6 shadow-sm space-y-3">
            <p className="text-sm font-medium text-brand-text">No se pudo cargar el trabajador</p>
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="ghost" onClick={() => navigate(-1)}>Volver</Button>
          </div>
        )
      }

    if (!item) {
        return (
          <div className="rounded-2xl bg-white p-6 shadow-sm space-y-3">
            <p className="text-sm text-brand-muted">No hay datos.</p>
            <Button variant="ghost" onClick={() => navigate(-1)}>Volver</Button>
          </div>
        )
      }

    // Lista de campos (muestra los más relevantes)
  const rows = [
    ["Nombre", item.nombre],
    ["Apellidos", item.apellidos],
    ["DNI", item.dni],
    ["Teléfono", item.telefono],
    ["Email", item.email],
    ["Puesto", item.puesto],
    ["Salario Bruto", item.salario_bruto],
    ["Activo", item.activo ? "Sí" : "No"],
    ["Empresa_ID", item.empresa_id],
  ]

    return (
        <div className="space-y-6 min-w-0">
          <header className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-brand-text truncate">
                {item.nombre} {item.apellidos}
              </h1>
              <p className="text-sm text-brand-muted">Detalle de trabajador (solo lectura).</p>
            </div>
    
            <Button variant="ghost" onClick={() => navigate(-1)}>
              Volver
            </Button>
          </header>
    
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <dl className="divide-y divide-brand-border">

        {/* Recorremos los campos y los mostramos*/}

              {rows.map(([label, value]) => (
                <div key={label} className="py-3 flex gap-6">
                  <dt className="w-44 text-sm text-brand-muted">{label}</dt>
                  <dd className="text-sm text-brand-text break-words">
                    {/** nullisd coalescing por si value es false o 0 */}
                    {value ?? "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      )
}