import Button from "../components/ui/Button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function EmpresasForm() {

  const navigate = useNavigate()
  const [error, setError] = useState("")

  //Estado del formulario
  const [form, setForm] = useState({
    razon_social: "",
    cif: "",
    nombre_comercial: "",
    direccion: "",
    codigo_postal: "",
    ciudad: "",
    provincia: "",
    pais: "España",
    telefono: "",
    email: "",
    codigo_cuenta_cotizacion: "",
    convenio_colectivo: "",
    sector_actividad: "",
    activa: true,
  })

  // Validación mínima
  
  const canSubmit = Boolean(form.razon_social.trim() && form.cif.trim()) // Requerimos al menos razón social y CIF para crear una empresa

  const handleChange = (e) => {
    const { name, type, value,checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // manejamos checkbox correctamente
    }))
  }
  //manejador submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault() // evita que el navegador recargue la página
    setError("") // reseteamos el error antes de intentar registrar

    console.log(form)

    if (!canSubmit) {
      setError(
        "Por favor, introduce una Razón Social y un CIF válidos para crear la empresa."
      )
      return
    }

    const payload = form
    
      try {
        const res = await fetch("http://localhost:3000/empresas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        let data = null
       
        try {
          data = await res.json()
        } catch  {
          data = null // si no es JSON, dejamos data como null
        }

        if (res.ok) {
          //data trae {ok:true, data:nuevaEmpresa}
          navigate("/app/empresas")
          return
        }
        //error controlado 409
        if (data?.code === "CIF_DUPLICADO" || res.status === 409){
          setError("Ya existe una empresa con ese CIF.")
          return
        }
        //error controlado 400
        if (data?.code === "VALIDATION_ERROR" || res.status === 400){
          setError(data?.message ?? "Error de validación. Revisa los campos e inténtalo de nuevo.")
          return
        }
        //error genérico
        
        setError(data?.message ??"Error al crear la empresa.")
        
      } catch (err) {
        setError("Error de conexión con el servidor.")
      }
  }


  return (
    <div className="max-w-md mx-auto"> {/* Centrado horizontal y ancho máximo para pantallas grandes */}
          {/* Fondo gris claro con padding y bordes redondeados para separar visualmente el formulario */}
          <div className="rounded-2xl bg-brand-surface p-4 sm:p-6">

            {/* Tarjeta blanca con sombra para el formulario */}

            <div className="rounded-2xl bg-white p-8 shadow-sm space-y-6">
              <header className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-brand-text">Crear nueva empresa</h2>
                <p className="text-sm text-brand-muted">
                  Página para registrar una nueva empresa.
                </p>
              </header>

            {/* Formulario con campos mínimos de empresa. */}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Razón Social */}

              <div className="space-y-1">
                <label htmlFor="razon_social" className="text-sm font-medium text-brand-text">
                  Razón Social
                </label>
                <input
                  type="text"
                  id="razon_social"
                  name ="razon_social"
                  value={form.razon_social}
                  onChange={handleChange}
                  placeholder="Razón Social"
                  autoComplete="organization"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>

              {/* CIF */}
              
              <div className="space-y-1">
                <label htmlFor="cif" className="text-sm font-medium text-brand-text">
                  CIF
                </label>
                <input
                  type="text"
                  id="cif"
                  name="cif"
                  value={form.cif}
                  onChange={handleChange}
                  placeholder="CIF"
                  autoComplete="cif"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>

              {/* Nombre Comercial */}
              
              <div className="space-y-1">
                <label htmlFor="nombre_comercial" className="text-sm font-medium text-brand-text">
                  Nombre Comercial
                </label>
                <input
                  type="text"
                  id="nombre_comercial"
                  name="nombre_comercial"
                  value={form.nombre_comercial}
                  onChange={handleChange}
                  placeholder="Nombre Comercial"
                  autoComplete="nombre_comercial"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>

              {/* Dirección */}
              
              <div className="space-y-1">
                <label htmlFor="direccion" className="text-sm font-medium text-brand-text">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  placeholder="Dirección"
                  autoComplete="direccion"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>

              {/* Código Postal */}
              
              <div className="space-y-1">
                <label htmlFor="codigo_postal" className="text-sm font-medium text-brand-text">
                  Código Postal
                </label>
                <input
                  type="text"
                  id="codigo_postal"
                  name="codigo_postal"
                  value={form.codigo_postal}
                  onChange={handleChange}
                  placeholder="Código Postal"
                  autoComplete="codigo_postal"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>
              
              {/* Ciudad */}
              
              <div className="space-y-1">
                <label htmlFor="ciudad" className="text-sm font-medium text-brand-text">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="ciudad"
                  name="ciudad"
                  value={form.ciudad}
                  onChange={handleChange}
                  placeholder="Ciudad"
                  autoComplete="ciudad"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>
                            
              {/* Provincia */}
              
              <div className="space-y-1">
                <label htmlFor="provincia" className="text-sm font-medium text-brand-text">
                  Provincia
                </label>
                <input
                  type="text"
                  id="provincia"
                  name="provincia"
                  value={form.provincia}
                  onChange={handleChange}
                  placeholder="Provincia"
                  autoComplete="provincia"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>
                            
              {/* País */}
              
              <div className="space-y-1">
                <label htmlFor="pais" className="text-sm font-medium text-brand-text">
                  País
                </label>
                <input
                  type="text"
                  id="pais"
                  name="pais"
                  value={form.pais}
                  onChange={handleChange}
                  placeholder="País"
                  autoComplete="pais"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>
                            
              {/* Teléfono */}
              
              <div className="space-y-1">
                <label htmlFor="telefono" className="text-sm font-medium text-brand-text">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  autoComplete="tel"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>
                            
              {/* Email */}
              
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-brand-text">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>

              {/* Código Cuenta Cotización */}
              
              <div className="space-y-1">
                <label htmlFor="codigo_cuenta_cotizacion" className="text-sm font-medium text-brand-text">
                  Código Cuenta Cotización
                </label>
                <input
                  type="text"
                  id="codigo_cuenta_cotizacion"
                  name="codigo_cuenta_cotizacion"
                  value={form.codigo_cuenta_cotizacion}
                  onChange={handleChange}
                  placeholder="Código Cuenta Cotización"
                  autoComplete="codigo_cuenta_cotizacion"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>
                            
              {/* Convenio Colectivo */}
              
              <div className="space-y-1">
                <label htmlFor="convenio_colectivo" className="text-sm font-medium text-brand-text">
                  Convenio Colectivo
                </label>
                <input
                  type="text"
                  id="convenio_colectivo"
                  name="convenio_colectivo"
                  value={form.convenio_colectivo}
                  onChange={handleChange}
                  placeholder="Convenio Colectivo"
                  autoComplete="convenio_colectivo"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>
                            
              {/* Sector de actividad */}
              
              <div className="space-y-1">
                <label htmlFor="sector_actividad" className="text-sm font-medium text-brand-text">
                  Sector de Actividad
                </label>
                <input
                  type="text"
                  id="sector_actividad"
                  name="sector_actividad"
                  value={form.sector_actividad}
                  onChange={handleChange}
                  placeholder="Sector de Actividad"
                  autoComplete="sector_actividad"
                  className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                />
              </div>
                            
              {/* Activa */}
              
              <div className="space-y-1">
                <label htmlFor="activa" className="text-sm font-medium text-brand-text ">
                  Empresa Activa  
                </label>
                <input
                  type="checkbox"
                  id="activa"
                  name="activa"
                  checked={form.activa}
                  onChange={handleChange}
                  className="w-4 h-4 text-brand-primary border border-brand-border rounded focus:ring-brand-secondary focus:ring-2 mx-2"
                />                  
              </div>
    
              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
    
              <Button type="submit" disabled={!canSubmit} className="w-full">  
                Crear empresa
              </Button>
    
              <p className="text-xs text-brand-muted text-center">
                Nota: si se desmarca, la empresa queda inactiva y no aparece en listados por defecto.
              </p>
            </form>
          </div>
          </div>
        </div>
    )
  }

