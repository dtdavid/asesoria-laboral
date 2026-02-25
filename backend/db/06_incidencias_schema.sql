CREATE TABLE incidencias (
    id BIGSERIAL PRIMARY KEY,

    empresa_id BIGINT NOT NULL,
    trabajador_id BIGINT,

    tipo VARCHAR(50) NOT NULL,                 -- ej: VACACIONES, IT, BAJA, ALTA
    estado VARCHAR(30) NOT NULL DEFAULT 'ABIERTA', -- ABIERTA, EN_PROCESO, CERRADA
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    descripcion TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    CONSTRAINT fk_incidencias_empresa
        FOREIGN KEY (empresa_id)
        REFERENCES empresas(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_incidencias_trabajador
        FOREIGN KEY (trabajador_id)
        REFERENCES trabajadores(id)
        ON DELETE SET NULL
);