

/**
 * Página privada: Empresas (placeholder)
 * En prototipos posteriores se implementará el listado y CRUD.
 */
export default function Empresas() {
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-brand-text">Empresas</h1>
        <p className="text-sm text-brand-muted">Gestión de clientes/empresas (placeholder).</p>
      </header>
      <section className="rounded border border-brand-border bg-white p-4 space-y-2">
        <p className="text-sm font-medium">En desarrollo</p>
        <p className="text-sm text-brand-muted">
          Aquí se listrán empresas y se podrán dar de alta nuevas en prototipos posteriores.
        </p>
      </section>
    </div>
  )
}
