import { API_URL } from "../config/api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" 
import Button from "../components/ui/Button"

/**
 * Página privada: Empresas
 * - Consume el backend (GET /empresas)
 * - Muestra estado de carga y error
 * - Renderiza un listado básico (tabla)
 */
export default function Empresas() {

  const [items, setItems] = useState([]) // empresas
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()


  async function loadEmpresas() {
      try {
        setLoading(true)
        setError("")

        const res = await fetch(`${API}/empresas`)
        const data = await res.json()

        if (!res.ok) {
          // Si el backend devuelve ok:false o error, lo mostramos
          throw new Error(data?.error || "Error al cargar empresas")
        }
          setItems(data.data || [])
      } catch (err) {
          setError(err?.message || "Error inesperado")
      } finally {
          setLoading(false)
      }
    }

  //Manejador DELETE empresa handleDelete
  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "¿Estás seguro de que quieres eliminar esta empresa?"
  )

  if (!confirmDelete) return

  try {
    const res = await fetch(`${API_URL}/empresas/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      setError("No se pudo eliminar la empresa.")
      return
    }

    // recargar listado
    loadEmpresas()

  } catch {
    setError("Error de conexión con el servidor.")
  }
}


  useEffect(() => {

    // Recarga la lista completa tras una operación (DELETE/PUT)
    
    loadEmpresas()

  }, [])

  const card = "rounded-2xl bg-white p-5 shadow-sm"
  
  return (
    <div className="space-y-6 min-w-0">
      {/* Header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl font-semibold text-brand-text">Empresas</h1>
          <p className="text-sm text-brand-muted">
            Listado de empresas desde la API.
          </p>
        </div>

        {/* POST nueva empresa */}

        <Button  variant="secondary"className="ml-auto" onClick={() => navigate("/app/empresas/nueva")}>Nueva empresa</Button>
        
      </header>

      {/* Estados */}

      {loading ? (
        <section className={card}>
          <p className="text-sm text-brand-muted">Cargando empresas…</p>
        </section>
      ) : error ? (
        <section className={card}>
          <p className="text-sm font-medium text-brand-text">
            No se pudieron cargar las empresas
          </p>
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
          <p className="mt-2 text-sm text-brand-muted">
            Comprueba que el backend está arrancado en{" "}
            <span className="font-medium">{API_URL}</span>.
          </p>
        </section>
      ) : (
        <section className={card}>
          {items.length === 0 ? (
            <p className="text-sm text-brand-muted">
              No hay empresas registradas.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-brand-border">
                  <tr className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
                    <th className="py-3 pr-4">ID</th>
                    <th className="py-3 pr-4">Razón social</th>
                    <th className="py-3 pr-4">CIF</th>
                    <th className="py-3 pr-4">Provincia</th>
                    <th className="py-3 pr-4">Activa</th>
                    <th className="py-3 pr-4">Acciones</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-brand-border">
                  {items.map((e) => (
                    <tr key={e.id} className="align-top">
                      <td className="py-3 pr-4 text-brand-muted">{e.id}</td>
                      <td className="py-3 pr-4 font-medium text-brand-text">
                        {e.razon_social}
                      </td>
                      <td className="py-3 pr-4 text-brand-text">{e.cif}</td>
                      <td className="py-3 pr-4 text-brand-text">
                        {e.provincia || "—"}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={[
                            "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                            e.activa
                              ? "bg-brand-surface text-brand-text"
                              : "bg-brand-surface text-brand-muted",
                          ].join(" ")}
                        >
                          {e.activa ? "Sí" : "No"}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-brand-text">
                        <Button onClick={() => navigate(`/app/empresas/${e.id}/editar`)}>Editar</Button>
                        <Button variant="ghost" className="ml-3" onClick={() => handleDelete(e.id)}>Eliminar</Button>
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


