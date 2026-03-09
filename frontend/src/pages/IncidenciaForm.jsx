import { useEffect, useState } from "react"            
import { useNavigate, useParams } from "react-router-dom" 
import Button from "../components/ui/Button"          
import { apiFetch } from "../lib/apiFetch"            

export default function IncidenciaForm(){

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [empresas, setEmpresas] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = Boolean(id) // true si existe id

    const [form, setForm] = useState({
        empresa_id: "",  
        trabajador_id:"",
        tipo:"",
        estado: "ABIERTA",
        fecha_inicio:"",
        fecha_fin:"",
        descripcion:""
    })
        
    // cargar empresas en el select
    useEffect(() => {

        const loadEmpresas = async () => {
            try {
                setLoading(true)
                setError("")
                const data = await apiFetch(`/empresas`)
                setEmpresas(data?.data || [])
            } catch (error) {
                setError(error?.message || "No se pudo cargar las empresas")
            } finally {
                setLoading(false)
            }
        }
        loadEmpresas()
    }, [])

    // cargar incidencias si hay id
    useEffect(() => {
        if(!isEdit) return
        const loadIncidencia = async () => {
            
            try {
                
                setError("")
                const data = await apiFetch(`/incidencias/${id}`)
                setForm((prev) => ({ ...prev, ...data.data}))
            } catch (error) {
                setError(error?.message || "No se pudo cargar la incidencia")
            } finally {
                setLoading(false)
            }
        }
        loadIncidencia()
    }, [isEdit, id])

 // Manejo inputs (texto/fecha/select)
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Validación mínima
  const canSubmit =
    String(form.empresa_id).trim() &&
    String(form.tipo).trim() &&
    String(form.fecha_inicio).trim()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!canSubmit) {
      setError("Campos obligatorios: empresa, tipo y fecha inicio.")
      return
    }

    // Convertimos tipos antes de enviar (inputs devuelven strings)
    const payload = {
      ...form,
      empresa_id: Number(form.empresa_id),
      trabajador_id: form.trabajador_id ? Number(form.trabajador_id) : null,
      fecha_fin: form.fecha_fin || null,
    }

    try {
      if (isEdit) {
        await apiFetch(`/incidencias/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        await apiFetch("/incidencias", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      navigate("/app/incidencias", {
                replace: true,
                state: { flash: isEdit ? "Incidencia actualizada." : "Incidencia creada." },
            })
    } catch (err) {
      setError(err?.message || "No se pudo guardar la incidencia.")
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-brand-text">
          {isEdit ? "Editar incidencia" : "Nueva incidencia"}
        </h1>
        <p className="text-sm text-brand-muted">
          {isEdit ? `ID: ${id}` : "Crear una incidencia para una empresa."}
        </p>
      </header>

      {error && (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm text-red-600">{error}</p>
        </section>
      )}

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm space-y-4">
        {/* Empresa */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-brand-text">
            Empresa <span className="text-red-600">*</span>
          </label>
          <select
            name="empresa_id"
            value={form.empresa_id ?? ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none"
            disabled={loading}
          >
            <option value="">Selecciona empresa…</option>
            {empresas.map((e) => (
              <option key={e.id} value={e.id}>
                {e.razon_social} (ID {e.id})
              </option>
            ))}
          </select>
        </div>

        {/* Trabajador ID (opcional) */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-brand-text">
            Trabajador ID (opcional)
          </label>
          <input
            type="number"
            name="trabajador_id"
            value={form.trabajador_id ?? ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none"
            placeholder="Ej: 1"
          />
        </div>

        {/* Tipo */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-brand-text">
            Tipo <span className="text-red-600">*</span>
          </label>
          <select
            name="tipo"
            value={form.tipo ?? ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none"
          >
            <option value="">Selecciona tipo…</option>
            <option value="VACACIONES">VACACIONES</option>
            <option value="IT">IT</option>
            <option value="BAJA">BAJA</option>
            <option value="ALTA">ALTA</option>
          </select>
        </div>

        {/* Estado */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-brand-text">Estado</label>
          <select
            name="estado"
            value={form.estado ?? "ABIERTA"}
            onChange={handleChange}
            className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none"
          >
            <option value="ABIERTA">ABIERTA</option>
            <option value="EN_PROCESO">EN_PROCESO</option>
            <option value="CERRADA">CERRADA</option>
          </select>
        </div>

        {/* Fechas */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-brand-text">
              Fecha inicio <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="fecha_inicio"
              value={form.fecha_inicio ?? ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-brand-text">Fecha fin</label>
            <input
              type="date"
              name="fecha_fin"
              value={form.fecha_fin ?? ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none"
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-brand-text">Descripción</label>
          <textarea
            name="descripcion"
            value={form.descripcion ?? ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none"
            rows={3}
            placeholder="Detalles de la incidencia..."
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={!canSubmit}>
            {isEdit ? "Guardar cambios" : "Crear incidencia"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )





}