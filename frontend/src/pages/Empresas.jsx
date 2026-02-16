
/**
 * Página privada: Empresas (placeholder)
 * En prototipos posteriores se implementará el listado y CRUD.
 */
export default function Empresas() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-brand-text">Empresas</h1>
          <p className="text-sm text-brand-muted">
            Gestión de clientes/empresas (placeholder).
          </p>
        </div>

        {/* Acciones (futuro): dejar sitio desde ya ayuda a que parezca producto real */}
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-text hover:bg-brand-surface transition-colors"
            disabled
          >
            Nueva empresa
          </button>
        </div>
      </header>

      {/* Filtros (futuro): estructura lista para cuando conectes con backend */}
      <section className="rounded-2xl bg-brand-surface p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Nombre, CIF, provincia…"
              className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
              disabled
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
              Estado
            </label>
            <select
              className="w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
              disabled
            >
              <option>Todas</option>
            </select>
          </div>
        </div>
      </section>

      {/* Tabla/listado (placeholder): aquí irá la tabla real */}
      <section className="rounded-2xl bg-white p-5 shadow-sm space-y-2">
        <p className="text-sm font-medium text-brand-text">En desarrollo</p>
        <p className="text-sm text-brand-muted">
          Aquí se listarán empresas y se podrán dar de alta nuevas en prototipos posteriores.
        </p>
      </section>
    </div>
  )
}

