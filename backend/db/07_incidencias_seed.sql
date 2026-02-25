INSERT INTO incidencias
  (empresa_id, trabajador_id, tipo, estado, fecha_inicio, fecha_fin, descripcion)
VALUES
  (2, 3, 'VACACIONES', 'ABIERTA', '2026-02-20', '2026-02-25', 'Vacaciones planificadas'),
  (3, 4, 'IT', 'EN_PROCESO', '2026-02-10', NULL, 'Baja IT por enfermedad común'),
  (2, NULL, 'CONVENIO', 'CERRADA', '2026-01-15', '2026-01-15', 'Actualización de convenio interno');