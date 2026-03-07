
import { useState, useEffect } from "react"
import { apiFetch} from "../lib/apiFetch"
import Button from "../components/ui/Button"



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
  

  //cargar las empresas en el estado setEmpresas

  useEffect(() => {
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
}, [])

// carga las incidencias cuando cambia empresa_id

  useEffect(() => {

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
}, [empresaId])



return (
  <div className="space-y-6 min-w-0">
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1 min-w-0">
        <h1 className="text-2xl font-semibold text-brand-text">Incidencias</h1>
        <p className="text-sm text-brand-muted">
          {empresaId
            ? `Empresa: ${items[0]?.razon_social || "—"} (ID: ${empresaId})`
            : "Selecciona una empresa para ver sus incidencias."}
        </p>
      </div>

      {/* Botón placeholder */}
      
      <Button variant="secondary" disabled>
        Nueva incidencia
      </Button>
    </header>

    {/* Select de empresa */}

    <section className="rounded-2xl bg-white p-5 shadow-sm space-y-3">
      <label className="text-sm font-medium text-brand-text">
        Empresa <span className="text-red-600">*</span>
      </label>
      <select
        value={empresaId}
        onChange={(e) => setEmpresaId(e.target.value)}
        className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
      >
        <option value="">Selecciona empresa…</option>
        {empresas.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.razon_social} (ID {emp.id})
          </option>
        ))}
      </select>
    </section>

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

    {!loading && !error && empresaId && (
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        {items.length === 0 ? (
          <p className="text-sm text-brand-muted">No hay incidencias para esta empresa.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border">
                <tr className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
                  <th className="py-3 pr-4">Empresa</th>
                  <th className="py-3 pr-4">Tipo</th>
                  <th className="py-3 pr-4">Trabajador</th>
                  <th className="py-3 pr-4">Estado</th>
                  <th className="py-3 pr-4">Inicio</th>
                  <th className="py-3 pr-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {items.map((it) => (
                  <tr key={it.id}>
                    <td className="py-3 pr-4">
                      {it.razon_social} (ID {it.empresa_id})
                    </td>
                    <td className="py-3 pr-4">{it.tipo}</td>
                    <td className="py-3 pr-4">
                      {it.trabajador_nombre
                        ? `${it.trabajador_nombre} ${it.trabajador_apellidos || ""}`
                        : it.trabajador_id
                          ? `ID ${it.trabajador_id}`
                          : "—"}
                    </td>
                    <td className="py-3 pr-4">{it.estado}</td>
                    <td className="py-3 pr-4">{it.fecha_inicio}</td>
                    <td className="py-3 pr-4">
                      <Button variant="ghost" disabled title="Pendiente de implementar">
                        Acciones
                      </Button>
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
  

