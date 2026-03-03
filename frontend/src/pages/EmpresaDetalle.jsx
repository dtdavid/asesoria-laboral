import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../components/ui/Button"
import { apiFetch } from "../lib/apiFetch"
import { useAuth } from "../context/AuthContext"

/**
 * Vista detalle (solo lectura) de una empresa.
 * - CLIENTE: ve su empresa (si intenta otra, backend lo bloqueará cuando uses /me/empresa)
 * - GESTOR: puede ver cualquier empresa por id
 */
export default function EmpresaDetalle() {
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

        // CLIENTE: usamos /me/empresa 
        // GESTOR: usamos /empresas/:id
        const isCliente = user?.role === "CLIENTE"
        const data = isCliente ? await apiFetch("/me/empresa") : await apiFetch(`/empresas/${id}`)

        setItem(data?.data || null)
      } catch (err) {
        setError(err?.message || "No se pudo cargar la empresa.")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [token, user?.role, id])

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-brand-muted">Cargando empresa…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm space-y-3">
        <p className="text-sm font-medium text-brand-text">No se pudo cargar la empresa</p>
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
    ["Razón social", item.razon_social],
    ["CIF", item.cif],
    ["Nombre comercial", item.nombre_comercial],
    ["Dirección", item.direccion],
    ["Código postal", item.codigo_postal],
    ["Ciudad", item.ciudad],
    ["Provincia", item.provincia],
    ["País", item.pais],
    ["Teléfono", item.telefono],
    ["Email", item.email],
    ["CCC", item.codigo_cuenta_cotizacion],
    ["Convenio", item.convenio_colectivo],
    ["Sector", item.sector_actividad],
    ["Activa", item.activa ? "Sí" : "No"],
  ]

  return (
    <div className="space-y-6 min-w-0">
      <header className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-brand-text truncate">
            {item.razon_social}
          </h1>
          <p className="text-sm text-brand-muted">Detalle de empresa (solo lectura).</p>
        </div>

        <Button variant="ghost" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </header>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <dl className="divide-y divide-brand-border">
          {rows.map(([label, value]) => (
            <div key={label} className="py-3 flex gap-6">
              <dt className="w-44 text-sm text-brand-muted">{label}</dt>
              <dd className="text-sm text-brand-text break-words">
                {value || "—"}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}