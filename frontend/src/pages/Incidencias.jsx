
import { useState, useEffect } from "react"
import { apiFetch} from "../lib/apiFetch"
import Button from "../components/ui/Button"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"



/**
 * Página privada: Incidencias (placeholder)
 * En prototipos posteriores se implementará el listado y CRUD.
 */

export default function Incidencias() {

  //estados
  const [items, setItems] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [empresaId, setEmpresaId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()
      
  const location = useLocation()
  const flash = location.state?.flash

  // mostrar fechas sin ISO largo
  const fmtDate = (v) => (v ? String(v).slice(0, 10) : "—")

  //condición para PUT y DELETE
  const { user } = useAuth()
  const isGestor = user?.role === "GESTOR"
  //detectar si es cliente sin empresa asignada
  const isCliente = user?.role === "CLIENTE"
  const noEmpresaAsignada = isCliente && !user?.empresa_id

  //mostrar tabla para CLIENTE
  const canShowTable = isGestor ? Boolean(empresaId): Boolean(user?.empresa_id)

  //cargar las empresas en el estado setEmpresas para poblar el select

  useEffect(() => {
    if (!isGestor) return

    const loadEmpresas = async () => {
      try {
        setLoading(true)
        setError("")
        const empresas = await apiFetch("/empresas")
        setEmpresas(empresas?.data || [])
      } catch (err) {
        setError(err?.message || "No se pudieron cargar empresas.")
      } finally {
        setLoading(false)
      }
    }
    loadEmpresas()
}, [isGestor])

// carga las incidencias cuando cambia empresa_id y las muestra en la tabla

  useEffect(() => {
    if(!isGestor) return
    if (!empresaId) return

    const loadIncidencias = async () => {
      try {
        setLoading(true)
        setError("")
        const incidencias = await apiFetch(`/incidencias?empresa_id=${empresaId}`)
        setItems(incidencias?.data || [])
      } catch (err) {
        setError(err?.message || "No se pudieron cargar incidencias.")
      } finally {
        setLoading(false)
      }
    }

    loadIncidencias()
}, [isGestor,empresaId])

useEffect(() => {
  if (isGestor) return

  if (!user?.empresa_id) {
    setItems([])
    setError("Usuario pendiente de asignación a una empresa. Contacta con tu gestor.")
    setLoading(false)
    return
  }

  const loadMyIncidencias = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await apiFetch("/me/incidencias")
      setItems(data?.data || [])
    } catch (err) {
      setError(err?.message || "No se pudieron cargar incidencias.")
    } finally {
      setLoading(false)
    }
  }

  loadMyIncidencias()
}, [isGestor])

const handleDelete = async (id) => {
  const ok = window.confirm("¿Seguro que quieres eliminar esta incidencia?")
  if (!ok) return

  try {
    setError("")
    await apiFetch(`/incidencias/${id}`, { method: "DELETE" })

    // recargar incidencias de la empresa seleccionada
    const data = await apiFetch(`/incidencias?empresa_id=${empresaId}`)
    setItems(data?.data || [])
  } catch (err) {
    setError(err?.message || "No se pudo eliminar la incidencia.")
  }
}

return (
  <div className="space-y-6 min-w-0">
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

{/**Select de empresa (GESTOR) para listar incidencias */}

      {isGestor && (
        <div className="w-full flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <select
            value={empresaId}
            onChange={(e) => setEmpresaId(e.target.value)}
            className="w-full sm:w-[520px] h-10 rounded-lg border border-brand-border bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-1"
          >
            <option value="">Selecciona empresa…</option>
            {empresas.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.razon_social} (ID {emp.id})
              </option>
            ))}
          </select>

          <Button
            variant="secondary"
            className="w-full sm:w-auto h-10"
            onClick={() => navigate("/app/incidencias/nueva")}
          >
            Nueva incidencia
          </Button>
        </div>
    )}
    </header>
    
      {/** Mensaje de Guardar Cambio */}

      {flash && (
        <section className="rounded-2xl border border-green-300 bg-green-50 p-4 shadow-sm">
            <p className="text-sm sm:text-base font-medium text-green-800">{flash}</p>
        </section>
      )}

    {/* Estados */}

    {loading && (
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-brand-muted">Cargando incidencias…</p>
      </section>
    )}

    {!loading && error && (
      <section className="rounded-2xl bg-white p-5 shadow-sm space-y-2">
        <p className="text-sm font-medium text-brand-text">No se pudieron cargar</p>
        <p className="text-sm text-red-600">{error}</p>
      </section>
    )}

    {/* Tabla (solo cuando hay empresa seleccionada y no hay error) */}

    {!loading && !error && canShowTable && (
      <section className="rounded-2xl bg-white p-1 sm:p-5 shadow-sm">
        {items.length === 0 ? (
          <p className="text-sm text-brand-muted">No hay incidencias en {isGestor ? "esta empresa" : "tu empresa"}.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border">
                <tr className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
                  <th className="py-3 pr-4 hidden sm:table-cell">Empresa</th>
                  <th className="py-3 pr-4 hidden sm:table-cell">Tipo</th>
                  <th className="py-4 pr-6">Trabajador</th>
                  <th className="py-3 pr-4 hidden sm:table-cell">Estado</th>
                  <th className="py-3 pr-4 hidden sm:table-cell">Inicio</th>
                  <th className="py-4 pr-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {items.map((it) => (
                  <tr key={it.id}>
                    <td className="py-3 pr-4 hidden sm:table-cell">
                      {it.razon_social} (ID {it.empresa_id})
                    </td>
                    <td className="py-3 pr-4 hidden sm:table-cell">{it.tipo}</td>
                    <td className="py-3 pr-6 break-words whitespace-nowrap">
                      {it.trabajador_nombre
                        ? `${it.trabajador_nombre} ${it.trabajador_apellidos || ""}`
                        : it.trabajador_id
                          ? `ID ${it.trabajador_id}`
                          : "—"}
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap hidden sm:table-cell">{it.estado}</td>
                    {/* <td className="py-3 pr-4">{it.fecha_inicio}</td> */}
                    <td className="py-3 pr-4 hidden sm:table-cell">{fmtDate(it.fecha_inicio)}</td>
                    <td className="py-3 pr-4 text-right">
                      <div className="inline-flex gap-2">
                        <Button
                          variant="primary"
                          className="px-3 py-1.5 text-xs"
                          onClick={() => navigate(`/app/incidencias/${it.id}`)}
                        >
                          Ver
                        </Button>

                        {isGestor && (
                          <Button
                            variant="ghost"
                            className="px-2 py-1.5 text-xs border"
                            onClick={() => handleDelete(it.id)}
                          >
                            Eliminar
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    )}
  </div>
)
}
  

