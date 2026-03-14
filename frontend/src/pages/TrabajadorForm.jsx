import Button from "../components/ui/Button"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { apiFetch} from "../lib/apiFetch"
import { useAuth } from "../context/AuthContext"

export default function TrabajadorForm() {

  // bloquear acceso por URL !isGestor

  const { user } = useAuth()
  const isGestor = user?.role === "GESTOR"

  if (!isGestor) {
    return (
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm text-brand-muted">No autorizado.</p>
      </section>
    )
  }

  const navigate = useNavigate()// para redirigir después de guardar
  const { id } = useParams() // si hay id, es edición; si no, creación
  const isEdit = Boolean(id) // true si id existe, false si es undefined
   
  //Estado de error para mostrar mensajes al usuario
  const [error, setError] = useState("")
  const [empresas, setEmpresas] = useState([])
   //Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    dni: "",
    empresa_id: "",
    telefono: "",
    email: "",
    puesto:"",
    salario_bruto: "",
    activo: true
  })

  useEffect(() => {
  const loadEmpresas = async () => {
    try {
      const data = await apiFetch("/empresas")
      setEmpresas(data?.data || [])
    } catch (err) {
      setError(err?.message || "No se pudieron cargar empresas.")
    }
  }

  loadEmpresas()
}, [])

useEffect(() => {

    if(!isEdit) return // Si no es edición, no cargamos datos
    //cargar datos del trabajador a editar
    const loadTrabajador = async () => {
        try {
            //limpiar errores previos
            setError("")
            //apiFetch para obtener datos del trabajador a editar
            const data = await apiFetch(`/trabajadores/${id}`)
            //llenar el formulario con los datos obtenidos
            //setForm((prev) => ({ ...prev, ...data?.data || {} }))
            setForm((prev) => ({ ...prev, ...data?.data }))
        } catch (err) {
            //En caso de error, mostrar mensaje al usuario
            setError(err?.message || "Error al cargar el trabajador.")
        }
    }
    loadTrabajador()
}, [isEdit, id])

//validación mínima del formulario
// se requiere nombre, apellidos, dni, empresa_id
//validamos 8 dígitos y una letra con regex
const isValidDni = /^\d{8}[A-Za-z]$/.test(form.dni.trim())
const canSubmit = Boolean(form.nombre.trim() && form.apellidos.trim() && isValidDni && form.empresa_id)

//manejador checkbox
  const handleChange = (e) => {
    const { name, type, value,checked } = e.target
    //mezclamos con el estado previo para mantener defaults 
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // manejamos checkbox correctamente
    }))
  }

  //manejador submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault() // evita que el navegador recargue la página
    setError("") // reseteamos el error antes de intentar registrar

    
    //verificamos validación mínima antes de enviar al backend
    if (!canSubmit) {
      setError(
        "Campos obligatorios: nombre, apellidos, DNI válido (8 números + letra) y empresa."
      )
      return
    }
    // convertimos tipos antes de enviar al backend (HTML inputs devuelve strings)
    //empresa_id llega como string desde el select o input pero backend / sql necesita Number
    const payload = {
  ...form,
  empresa_id: Number(form.empresa_id),
  salario_bruto: form.salario_bruto ? Number(form.salario_bruto) : null,
}
    
      try {
  // apiFetch añade JWT y devuelve JSON ya parseado
  if (isEdit) {
    await apiFetch(`/trabajadores/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
  } else {
    await apiFetch("/trabajadores", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
  }

  navigate("/app/trabajadores")
  return
} catch (err) {
  // apiFetch lanza Error con message/error del backend
  const msg = err?.message || "Error de conexión con el servidor."

  
  if (msg.toLowerCase().includes("dni")) {
    setError("Ya existe un trabajador con ese DNI.")
    return
  }

  setError(msg)
}
  }


  return (
    <div className="max-w-md mx-auto"> {/* Centrado horizontal y ancho máximo para pantallas grandes */}
          {/* Fondo gris claro con padding y bordes redondeados para separar visualmente el formulario */}
          <div className="rounded-2xl bg-brand-surface p-4 sm:p-6">

            {/* Tarjeta blanca con sombra para el formulario */}

            <div className="rounded-2xl bg-white p-8 shadow-sm space-y-6">
              <header className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-brand-text">
                  {isEdit ? "Editar trabajador" : "Crear nuevo trabajador"}
                </h2>
                <p className="text-sm text-brand-muted">
                  {isEdit
                    ? "Actualiza los datos del trabajador."
                    : "Página para registrar un nuevo trabajador."}
                </p>
              </header>

            {/* Formulario con campos mínimos de empresa. */}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">

              {/* Nombre */}

              <div className="space-y-1 md:col-span-2">
                <label htmlFor="nombre" className="text-sm font-medium text-brand-text">
                  Nombre<span className="text-red-600 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name ="nombre"
                  value={form.nombre ?? ""} // para evitar el error de componente controlado/no controlado cuando form.nombre es undefined
                  onChange={handleChange}
                  placeholder="Nombre"
                  autoComplete="nombre"
                  className="w-full h-11 rounded-lg border border-brand-border bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>

              {/* Apellidos */}
              
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="apellidos" className="text-sm font-medium text-brand-text">
                  Apellidos<span className="text-red-600 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={form.apellidos ?? ""}
                  onChange={handleChange}
                  placeholder="Apellidos"
                  autoComplete="apellidos"
                  className="w-full h-11 rounded-lg border border-brand-border bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>

              {/* DNI */}
              
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="dni" className="text-sm font-medium text-brand-text">
                  DNI<span className="text-red-600 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  value={form.dni ?? ""}
                  onChange={handleChange}
                  placeholder="DNI"
                  autoComplete="dni"
                  className="w-full h-11 rounded-lg border border-brand-border bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>

              {/* empresa_id */}
              
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="empresa_id" className="text-sm font-medium text-brand-text">
                  Empresa<span className="text-red-600 ml-1">*</span>
                </label>
                <select
                  id="empresa_id"
                  name="empresa_id"
                  value={form.empresa_id ?? ""}
                  onChange={handleChange}
                  className="w-full h-11 rounded-lg border border-brand-border bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                >
                  <option value="">Selecciona empresa…</option>
                  {empresas.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.razon_social} (ID {emp.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Teléfono */}
              
              <div className="space-y-1 md:col-span-1">
                <label htmlFor="telefono" className="text-sm font-medium text-brand-text">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={form.telefono ?? ""}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  autoComplete="telefono"
                  className="w-full h-11 rounded-lg border border-brand-border bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>
              
              {/* Email */}
              
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="email" className="text-sm font-medium text-brand-text">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={form.email ?? ""}
                  onChange={handleChange}
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full h-11 rounded-lg border border-brand-border bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>
                            
              {/* Puesto */}
              
              <div className="space-y-1">
                <label htmlFor="puesto" className="text-sm font-medium text-brand-text">
                  Puesto
                </label>
                <input
                  type="text"
                  id="puesto"
                  name="puesto"
                  value={form.puesto ?? ""}
                  onChange={handleChange}
                  placeholder="Puesto"
                  autoComplete="puesto"
                  className="w-full h-11 rounded-lg border border-brand-border bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>
                            
              {/* Salario Bruto */}
              
              <div className="space-y-1">
                <label htmlFor="salario_bruto" className="text-sm font-medium text-brand-text">
                  Salario Bruto
                </label>
                <input
                  type="text"
                  id="salario_bruto"
                  name="salario_bruto"
                  value={form.salario_bruto ?? ""}
                  onChange={handleChange}
                  placeholder="Salario Bruto"
                  autoComplete="salario_bruto"
                  className="w-full h-11 rounded-lg border border-brand-border bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>
                            
              {/* Activo */}
              
              <div className="flex items-center gap-3 rounded-lg border border-brand-border bg-brand-surface px-3 py-3 md:col-span-2">
                <input
                  type="checkbox"
                  id="activo"
                  name="activo"
                  checked={Boolean(form.activo)}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border border-brand-border text-brand-primary focus:ring-2 focus:ring-brand-secondary"
                />
                <label htmlFor="activo" className="text-sm font-medium text-brand-text">
                  Trabajador activo
                </label>
              </div>

              </div>
    
              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
    
              <Button type="submit" disabled={!canSubmit} className="w-full">  
                {isEdit ? "Actualizar trabajador" : "Crear trabajador"}
              </Button>
    
              <p className="text-xs text-brand-muted text-center">
                Nota: si se desmarca, el trabajador queda inactivo y no aparece en listados por defecto.
              </p>
            </form>
          </div>
          </div>
        </div>
    )
}