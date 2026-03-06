import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"
import { apiFetch} from "../lib/apiFetch"
import Button from "../components/ui/Button"



export default function AsignarEmpresas (){

const [clientes, setClientes] = useState([])
const [empresas, setEmpresas] = useState([])
const [clienteId, setClienteId] = useState("")
const [empresaId, setEmpresaId] = useState("")
const [loading, setLoading] = useState(true)
const [error, setError] = useState("")
const [success, setSuccess] = useState("")


const { user } = useAuth()
const isGestor = user?.role === "GESTOR"

// Carga inicial de clientes y empresas
useEffect(() => {

    
    //cargar datos del CLIENTE y de las Empresas
    const load = async () => {
        try {
            // estados de UI
            setLoading(true)
            setError("")
            setSuccess("")


            //apiFetch para obtener datos del CLIENTE
            const u = await apiFetch(`/usuarios?role=CLIENTE`)
            //apiFetch para obtener datos de las empresas
            const e = await apiFetch(`/empresas`)
            //guardamos estado de Clientes con los datos que devuelve la apiFetch 
            setClientes(u?.data || [])
            //guardamos estado de Empresas con los datos que devuelve la apiFetch 
            setEmpresas(e?.data || [])

        } catch (err) {
            //En caso de error, mostrar mensaje al usuario
            setError(err?.message || "No se pudieron cargar datos")
        } finally {
            setLoading(false)
        }
    }
    if(isGestor) load()
}, [isGestor])
// Asignación de empresa a cliente (PATCH)
// Envío del formulario: asigna empresa a un cliente (solo GESTOR)
const handleSubmit = async (e) => {
  e.preventDefault()
  setError("")
  setSuccess("")

  // Validación mínima: ambos selects deben tener valor
  if (!clienteId || !empresaId) {
    setError("Selecciona un cliente y una empresa.")
    return
  }

  try {
    // PATCH /usuarios/:id/asignar-empresa  { empresa_id: number }
    await apiFetch(`/usuarios/${clienteId}/asignar-empresa`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ empresa_id: Number(empresaId) }),
    })

    setSuccess("Asignación realizada correctamente.")

    // Refrescar clientes para ver status/empresa_id actualizado en el select
    const u = await apiFetch("/usuarios?role=CLIENTE")
    setClientes(u?.data || [])
  } catch (err) {
    setError(err?.message || "No se pudo asignar la empresa.")
  }
}

if (!isGestor) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm text-brand-muted">No autorizado.</p>
    </div>
  )
}

return (
    <div className="max-w-md mx-auto"> {/* Centrado horizontal y ancho máximo para pantallas grandes */}
          {/* Fondo gris claro con padding y bordes redondeados para separar visualmente el formulario */}
          <div className="rounded-2xl bg-brand-surface p-4 sm:p-6">

            {/* Tarjeta blanca con sombra para el formulario */}

            <div className="rounded-2xl bg-white p-8 shadow-sm space-y-6">
              <header className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-brand-text">Asignar empresa a Cliente</h2>
                <p className="text-sm text-brand-muted">
                  Página para asignar empresas a clientes
                </p>
              </header>

            {/* Formulario  */}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Select cliente */}

              <div className="space-y-1">
                <select 
                value={clienteId} 
                onChange={(e) => setClienteId(e.target.value)}
                className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                >
                    <option value="">Selecciona cliente…</option>
                    {clientes.map(c => (
                        <option key={c.id} value={c.id}>
                        {c.email} ({c.status}) {c.empresa_id ? `- empresa ${c.empresa_id}` : ""}
                        </option>
                    ))}
                    </select>
              </div>

              {/* Select empresa */}
              
              <div className="space-y-1">
                <select 
                value={empresaId} 
                onChange={(e) => setEmpresaId(e.target.value)}
                className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                >
                    <option value="">Selecciona empresa…</option>
                    {empresas.map(emp => (
                        <option key={emp.id} value={emp.id}>
                        {emp.razon_social} (ID {emp.id})
                        </option>
                    ))}
                </select>
              </div>

    
              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              {success && (
                <p className="text-sm text-green-700" role="status">
                    {success}
                </p>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                Asignar
                </Button>

            </form>
          </div>
          </div>
        </div>
    )


}