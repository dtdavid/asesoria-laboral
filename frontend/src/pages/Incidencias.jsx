/**
 * Página privada: Incidencias (placeholder)
 * En prototipos posteriores se implementará el listado y CRUD.
 */

export default function Incidencias() {
  return (
    <div className="space-y-6 min-w-0">
      {/* Header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl font-semibold text-brand-text">
            Incidencias
          </h1>
          <p className="text-sm text-brand-muted">
            Vacaciones, IT y otras incidencias laborales (placeholder).
          </p>
        </div>

        <button
          type="button"
          disabled
          className="rounded-lg border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-text transition-colors hover:bg-brand-surface disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Nueva incidencia
        </button>
      </header>

      {/* Card principal */}
      <section className="rounded-2xl bg-white p-6 shadow-sm min-w-0 space-y-2">
        <p className="text-sm font-medium text-brand-text">En desarrollo</p>
        <p className="text-sm text-brand-muted">
          Se implementará un registro de incidencias con estados y fechas.
        </p>
      </section>
    </div>
  )
}
