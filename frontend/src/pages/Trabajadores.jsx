/**
 * Página privada: Trabajadores (placeholder)
 * En prototipos posteriores se implementará el listado y CRUD.
 */

export default function Trabajadores() {
  return (
    <div className="space-y-6 min-w-0">
      {/* Header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl font-semibold text-brand-text">
            Trabajadores
          </h1>
          <p className="text-sm text-brand-muted">
            Fichas y estado laboral por empresa (placeholder).
          </p>
        </div>

        <button
          type="button"
          disabled
          className="rounded-lg border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-text transition-colors hover:bg-brand-surface disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Nuevo trabajador
        </button>
      </header>

      {/* Card principal */}
      <section className="rounded-2xl bg-white p-6 shadow-sm min-w-0 space-y-2">
        <p className="text-sm font-medium text-brand-text">En desarrollo</p>
        <p className="text-sm text-brand-muted">
          En próximos prototipos se añadirá listado, búsqueda y detalle de cada trabajador.
        </p>
      </section>
    </div>
  )
}

