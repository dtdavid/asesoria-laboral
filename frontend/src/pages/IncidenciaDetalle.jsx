import { useEffect, useState } from "react"
import { apiFetch } from "../lib/apiFetch"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../components/ui/Button"

export default function IncidenciaDetalle(){

    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(()=> {

        const load = async () => {
            try {
              setLoading(true)
              setError("")
              const data = await apiFetch(`/incidencias/${id}`)
              setItem(data?.data || null)
                
            } catch (error) {
                setError(error?.message || "No se pudo cargar la incidencia")
            } finally{
                setLoading(false)
            }
        }

        load()
    }, [id])

    if (loading){
        return (
            <section className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm text-brand-muted">Cargando incidencia…</p>
            </section>
        )
    }
    if (error){
        return (
            <section className="rounded-2xl bg-white p-5 shadow-sm space-y-2">
                <p className="text-sm font-medium text-brand-text">No se pudo cargar</p>
                <p className="text-sm text-red-600">{error}</p>
                <Button variant="ghost" onClick={() => navigate(-1)}>Volver</Button>
            </section>
        )
    }
    if (!item){
        return (
            <section className="rounded-2xl bg-white p-5 shadow-sm space-y-2">
                <p className="text-sm text-brand-muted">No hay datos.</p>
                <Button variant="ghost" onClick={() => navigate(-1)}>Volver</Button>
            </section>
        )
    }
    // array con datos a mostrar
    const rows =[
        ["Empresa", `${item.razon_social || "—"} (ID ${item.empresa_id})`],
        ["Trabajador", item.trabajador_nombre ? `${item.trabajador_nombre} ${item.trabajador_apellidos || ""}` : (item.trabajador_id ? `ID ${item.trabajador_id}` : "—")],
        ["Tipo", item.tipo],
        ["Estado", item.estado],
        ["Fecha inicio", item.fecha_inicio],
        ["Fecha fin", item.fecha_fin],
        ["Descripción", item.descripcion],
    ]
    //renderizado
    return (
        <div className="space-y-6 min-w-0">
        <header className="flex items-center justify-between gap-3">
            <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-brand-text">Incidencia #{item.id}</h1>
            <p className="text-sm text-brand-muted">Detalle (solo lectura).</p>
            </div>
            <Button variant="ghost" onClick={() => navigate(-1)}>Volver</Button>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
            <dl className="divide-y divide-brand-border">
            {rows.map(([label, value]) => (
                <div key={label} className="py-3 flex gap-6">
                    <dt className="w-44 text-sm text-brand-muted">{label}</dt>
                    <dd className="text-sm text-brand-text break-words">{value ?? "—"}</dd>
                </div>
            ))}
            </dl>

            {/** button (GESTOR) para navegar a IncidenciaForm.jsx */}
            
            <div className="mt-6">
                <Button 
                variant="secondary" 
                onClick = {() => navigate(`/app/incidencias/${item.id}/editar`)}
                >
                Editar incidencia
                </Button>
            </div>
        </section>
        </div>
    )


}

