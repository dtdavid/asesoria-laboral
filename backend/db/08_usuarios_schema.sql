CREATE TABLE IF NOT EXISTS usuarios (
  id BIGSERIAL PRIMARY KEY,

  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,

  role VARCHAR(20) NOT NULL DEFAULT 'CLIENTE',
  status VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',

  empresa_id BIGINT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_usuarios_empresa
    FOREIGN KEY (empresa_id)
    REFERENCES empresas(id)
    ON DELETE SET NULL,

  CONSTRAINT chk_usuarios_role
    CHECK (role IN ('GESTOR', 'CLIENTE')),

  CONSTRAINT chk_usuarios_status
    CHECK (status IN ('PENDIENTE', 'ACTIVO'))
);