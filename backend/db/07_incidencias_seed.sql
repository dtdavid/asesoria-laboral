-- 07_incidencias_seed.sql
-- Seed: 2 incidencias por trabajador (VACACIONES + IT)

-- Opcional: reseteo datos en cada carga
TRUNCATE TABLE incidencias RESTART IDENTITY;

INSERT INTO incidencias (
  empresa_id, trabajador_id, tipo, estado, fecha_inicio, fecha_fin, descripcion
)
SELECT
  t.empresa_id,
  t.id AS trabajador_id,
  v.tipo,
  v.estado,
  v.fecha_inicio,
  v.fecha_fin,
  v.descripcion
FROM trabajadores t
CROSS JOIN LATERAL (
  VALUES
    ('VACACIONES', 'CERRADA',   DATE '2026-01-10', DATE '2026-01-17', 'Solicitud de vacaciones aprobada.'),
    ('IT',         'EN_PROCESO',DATE '2026-02-05', NULL,             'Baja médica en tramitación.')
) AS v(tipo, estado, fecha_inicio, fecha_fin, descripcion);