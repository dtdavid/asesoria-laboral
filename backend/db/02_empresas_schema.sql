CREATE TABLE IF NOT EXISTS empresas (
  id BIGSERIAL PRIMARY KEY,
  razon_social VARCHAR(150) NOT NULL,
  cif VARCHAR(15) NOT NULL UNIQUE,
  nombre_comercial VARCHAR(150),

  direccion VARCHAR(200),
  codigo_postal VARCHAR(10),
  ciudad VARCHAR(100),
  provincia VARCHAR(100),
  pais VARCHAR(100) DEFAULT 'España',

  telefono VARCHAR(20),
  email VARCHAR(150),

  codigo_cuenta_cotizacion VARCHAR(20),
  convenio_colectivo VARCHAR(150),
  sector_actividad VARCHAR(150),

  activa BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
