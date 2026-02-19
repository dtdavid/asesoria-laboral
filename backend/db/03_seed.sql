INSERT INTO empresas (
  razon_social, cif, nombre_comercial,
  direccion, codigo_postal, ciudad, provincia,
  telefono, email, activa
) VALUES
(
  'Asesoría Laboral Atlántico, S.L.',
  'B12345678',
  'Atlántico Laboral',
  'Rúa San Clemente s/n',
  '15705',
  'Santiago de Compostela',
  'A Coruña',
  '+34 881 867 501',
  'info@atlantico-laboral.test',
  TRUE
),
(
  'Gestión Nóminas Norte, S.L.',
  'B87654321',
  'Nóminas Norte',
  'Av. do Camiño 10',
  '15001',
  'A Coruña',
  'A Coruña',
  '+34 900 123 456',
  'contacto@norte-nominas.test',
  TRUE
)
ON CONFLICT (cif) DO NOTHING;
