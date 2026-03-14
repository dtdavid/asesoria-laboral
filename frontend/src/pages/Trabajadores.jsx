
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" 
import Button from "../components/ui/Button"
import { apiFetch } from "../lib/apiFetch"
import { useAuth } from "../context/AuthContext"
import { API_URL } from "../config/api"
/**
 * Página privada: Trabajadores (placeholder)
 * En prototipos posteriores se implementará el listado y CRUD.
 */

export default function Trabajadores() {

  
  const [items, setItems] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [empresaId, setEmpresaId] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { token, user } = useAuth()
  const isCliente = user?.role === "CLIENTE"

  const isNoEmpresa = error?.includes("pendiente de asignación")

  
  async function loadTrabajadores() {
  try {
    setLoading(true)
    setError("")

    const path = isCliente
      ? "/me/trabajadores"
      : `/trabajadores?empresa_id=${empresaId}`

    const data = await apiFetch(path)
    setItems(data?.data || [])
  } catch (err) {
    if (err?.status === 403 && err?.code === "NO_EMPRESA_ASIGNADA") {
      setError("Usuario pendiente de asignación a una empresa. Contacta con tu gestor.")
    } else {
      setError(err?.message || "Error inesperado")
    }
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  if (!token || isCliente) return

  const loadEmpresas = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await apiFetch("/empresas")
      setEmpresas(data?.data || [])
    } catch (err) {
      setError(err?.message || "No se pudieron cargar empresas.")
    } finally {
      setLoading(false)
    }
  }

  loadEmpresas()
}, [token, isCliente])

useEffect(()=> {
  if (!token || !user || !isCliente) return

  loadTrabajadores()
}, [token, user, isCliente])

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
  if (!token || isCliente) return
  if (!empresaId) {
    setItems([])
    return
  }

  loadTrabajadores()
}, [token, isCliente, empresaId])

  const card = "rounded-2xl bg-white p-5 shadow-sm"
  const canShowTable = isCliente ? true : Boolean(empresaId)

  return (
    <div className="space-y-6 min-w-0">
      {/* Header */}
      <header className="flex flex-col gap-4">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl font-semibold text-brand-text">Trabajadores</h1>
          <p className="text-sm text-brand-muted">
            Listado de trabajadores desde la API.
          </p>
        </div>

        {!isCliente && (
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
              className="w-full sm:w-auto"
              onClick={() => navigate("/app/trabajadores/nuevo")}
            >
              Nuevo trabajador
            </Button>
          </div>
        )}
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

            {!isNoEmpresa && (
              <p className="mt-2 text-sm text-brand-muted">
                Comprueba que el backend está arrancado en{" "}
                <span className="font-medium">{API_URL}</span>.
              </p>
            )}
          </section>
          ) : !canShowTable ? (
              <section className={card}>
                <p className="text-sm text-brand-muted">
                  Selecciona una empresa para ver sus trabajadores.
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
                  <table className="w-full min-w-0 text-left text-sm">
                    <thead className="border-b border-brand-border">
                      <tr className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
                        <th className="py-3 pr-4 hidden sm:table-cell">ID</th>
                        <th className="py-3 pr-4">Nombre</th>
                        <th className="py-3 pr-4">Apellidos</th>
                        <th className="py-3 pr-4 hidden lg:table-cell">DNI</th>
                        <th className="py-3">{isCliente ? "Ver" : "Acciones"}</th>
                      </tr>
                    </thead>
      
                      <tbody className="divide-y divide-brand-border">

                        {/* recorremos los trabajadores */}

                        {items.map((e) => (
                          <tr key={e.id} className="align-middle">
                            <td className="py-3 pr-4 text-brand-muted hidden sm:table-cell">{e.id}</td>
                            <td className="py-3 pr-4 font-medium text-brand-text">
                              {e.nombre}
                            </td>
                            <td className="py-3 pr-4 text-brand-text">{e.apellidos}</td>
                            <td className="py-3 pr-4 text-brand-text hidden lg:table-cell">
                              {e.dni || "—"}
                            </td>

                            <td className="py-3 text-brand-text">
                              {isCliente ? (
                                <Button
                                  className="w-full sm:w-auto"
                                  onClick={() => navigate(`/app/trabajadores/${e.id}`)}
                                >
                                  Ver
                                </Button>
                              ) : (
                                <div className="flex flex-col justify-center gap-2 sm:flex-row sm:items-center sm:justify-end">
                                  <Button
                                    className="w-full sm:w-auto"
                                    onClick={() => navigate(`/app/trabajadores/${e.id}/editar`)}
                                  >
                                    Editar
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    className="w-full sm:w-auto"
                                    onClick={() => handleDelete(e.id)}
                                  >
                                    Eliminar
                                  </Button>
                                </div>
                              )}
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

