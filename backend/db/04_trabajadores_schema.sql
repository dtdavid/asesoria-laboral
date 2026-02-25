CREATE TABLE trabajadores (
    id BIGSERIAL PRIMARY KEY,

    empresa_id BIGINT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    dni VARCHAR(15) NOT NULL UNIQUE,

    telefono VARCHAR(20),
    email VARCHAR(150),

    puesto VARCHAR(100),
    salario_bruto NUMERIC(10,2),

    activo BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    CONSTRAINT fk_trabajadores_empresa
        FOREIGN KEY (empresa_id)
        REFERENCES empresas(id)
        ON DELETE CASCADE
);