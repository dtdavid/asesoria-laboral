export default function Incidencias() {
  return (
    <div className="space-y-4">
        <header className="space-y-1">
            <h1 className="text-2xl font-semibold text-brand-text">Incidencias</h1>
            <p className="text-sm text-brand-muted">
                Vacaciones, IT y otras incidencias laborales (placeholder).
            </p>
        </header>
        <section className="rounded border border-brand-border bg-white p-4 space-y-2">
            <p className="text-sm font-medium">En desarrollo</p>
            <p className="text-sm text-brand-muted">
                Se implementará un registro de incidencias con estados y fechas.
            </p>
        </section>
    </div>
  )
}