
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" 
import Button from "../components/ui/Button"
import { apiFetch } from "../lib/apiFetch"
import { useAuth } from "../context/AuthContext"
/**
 * Página privada: Trabajadores (placeholder)
 * En prototipos posteriores se implementará el listado y CRUD.
 */

export default function Trabajadores() {

  const [items, setItems] = useState([]) // empresas
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { token, user } = useAuth()

  async function loadTrabajadores() {
  try {
    setLoading(true)
    setError("")

    const empresaId = 5 // dinámico para gestor
    const path =
    user?.role === "CLIENTE"
    ? "/me/trabajadores"
    : `/trabajadores?empresa_id=${empresaId}`

    const data = await apiFetch(path)

    setItems(data?.data || [])
  } catch (err) {
    setError(err?.message || "Error inesperado")
  } finally {
    setLoading(false)
  }
}

    //Manejador DELETE empresa handleDelete
  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "¿Estás seguro de que quieres eliminar este trabajador?"
  )

  if (!confirmDelete) return

  try {
    await apiFetch(`/trabajadores/${id}`, { method: "DELETE" })
    loadTrabajadores()
  } catch (err) {
    setError(err?.message || "No se pudo eliminar el trabajador.")
  }
}
    useEffect(() => {

  if (!token) return

  loadTrabajadores()

}, [token])

  const card = "rounded-2xl bg-white p-5 shadow-sm"

  return (
    <div className="space-y-6 min-w-0">
      {/* Header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl font-semibold text-brand-text">
            Trabajadores
          </h1>
          <p className="text-sm text-brand-muted">
            Listado de trabajadores desde la API.
          </p>
        </div>

      {/* POST nueva empresa */}
        
      <Button  variant="secondary"className="ml-auto" onClick={() => navigate("/app/trabajadores/nuevo")}>Nuevo trabajador</Button>


      </header>

      {/* Estados */}


      {loading ? (
      <section className={card}>
        <p className="text-sm text-brand-muted">Cargando trabajadores…</p>
      </section>
        ) : error ? (
          <section className={card}>
            <p className="text-sm font-medium text-brand-text">
                  No se pudieron cargar los trabajadores
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
                    No hay trabajadores registrados.
              </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-brand-border">
                      <tr className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
                        <th className="py-3 pr-4">ID</th>
                        <th className="py-3 pr-4">Nombre</th>
                        <th className="py-3 pr-4">Apellidos</th>
                        <th className="py-3 pr-4">DNI</th>
                        <th className="py-3 pr-4">Acciones</th>
                        </tr>
                      </thead>
      
                      <tbody className="divide-y divide-brand-border">
                        {items.map((e) => (
                          <tr key={e.id} className="align-top">
                            <td className="py-3 pr-4 text-brand-muted">{e.id}</td>
                            <td className="py-3 pr-4 font-medium text-brand-text">
                              {e.nombre}
                            </td>
                            <td className="py-3 pr-4 text-brand-text">{e.apellidos}</td>
                            <td className="py-3 pr-4 text-brand-text">
                              {e.dni || "—"}
                            </td>
                            <td className="py-3 pr-4 text-brand-text">
                              <Button onClick={() => navigate(`/app/trabajadores/${e.id}/editar`)}>Ver</Button>
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

