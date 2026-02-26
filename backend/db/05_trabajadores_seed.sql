INSERT INTO trabajadores (
  empresa_id, nombre, apellidos, dni, telefono, email, puesto, salario_bruto, activo
) VALUES
-- Empresa 1
(1, 'Lucía',  'Pérez García',   '11111111A', '600111111', 'lucia.perez@demo.test',  'Administración', 24000, TRUE),
(1, 'Manuel', 'López Sánchez',  '11111111B', '600111112', 'manuel.lopez@demo.test', 'Gestor laboral', 28000, TRUE),
(1, 'Paula',  'Díaz Romero',    '11111111C', '600111113', 'paula.diaz@demo.test',   'Técnico RRHH',   26000, TRUE),
(1, 'Diego',  'Fernández Gil',  '11111111D', '600111114', 'diego.fernandez@demo.test','Contabilidad', 25000, TRUE),
(1, 'Marta',  'Suárez Varela',  '11111111E', '600111115', 'marta.suarez@demo.test', 'Recepción',      22000, TRUE),

-- Empresa 2
(2, 'Hugo',   'Martín Torres',  '22222222A', '600222221', 'hugo.martin@demo.test',  'Gestor laboral', 28500, TRUE),
(2, 'Sara',   'Gómez Alonso',   '22222222B', '600222222', 'sara.gomez@demo.test',   'Administración', 23500, TRUE),
(2, 'Iván',   'Vega Castro',    '22222222C', '600222223', 'ivan.vega@demo.test',    'Técnico RRHH',   26500, TRUE),
(2, 'Noa',    'Rey Iglesias',   '22222222D', '600222224', 'noa.rey@demo.test',      'Contabilidad',   25500, TRUE),
(2, 'Álvaro', 'Santos Prieto',  '22222222E', '600222225', 'alvaro.santos@demo.test','Soporte',        21000, TRUE),

-- Empresa 3
(3, 'Carla',  'Navarro Vidal',  '33333333A', '600333331', 'carla.navarro@demo.test','Administración', 24000, TRUE),
(3, 'Adrián', 'Ortega Molina',  '33333333B', '600333332', 'adrian.ortega@demo.test','Gestor laboral', 29000, TRUE),
(3, 'Elena',  'Cruz Herrera',   '33333333C', '600333333', 'elena.cruz@demo.test',   'Técnico RRHH',   27000, TRUE),
(3, 'Jorge',  'Ramos Peña',     '33333333D', '600333334', 'jorge.ramos@demo.test',  'Contabilidad',   26000, TRUE),
(3, 'Irene',  'Flores León',    '33333333E', '600333335', 'irene.flores@demo.test', 'Recepción',      22000, TRUE),

-- Empresa 4
(4, 'Mario',  'Domínguez Sanz', '44444444A', '600444441', 'mario.dominguez@demo.test','Gestor laboral', 29500, TRUE),
(4, 'Nerea',  'Rubio Cano',     '44444444B', '600444442', 'nerea.rubio@demo.test',  'Administración', 24000, TRUE),
(4, 'Víctor', 'Méndez Rivas',   '44444444C', '600444443', 'victor.mendez@demo.test','Técnico RRHH',   27500, TRUE),
(4, 'Ainhoa', 'Blanco Pardo',   '44444444D', '600444444', 'ainhoa.blanco@demo.test','Contabilidad',   26500, TRUE),
(4, 'Raúl',   'Campos Núñez',   '44444444E', '600444445', 'raul.campos@demo.test',  'Soporte',        21500, TRUE),

-- Empresa 5
(5, 'Celia',  'Moreno Serra',   '55555555A', '600555551', 'celia.moreno@demo.test', 'Administración', 24500, TRUE),
(5, 'Óscar',  'Ibarra Solís',   '55555555B', '600555552', 'oscar.ibarra@demo.test', 'Gestor laboral', 30000, TRUE),
(5, 'Eva',    'Pascual Rojas',  '55555555C', '600555553', 'eva.pascual@demo.test',  'Técnico RRHH',   28000, TRUE),
(5, 'Bruno',  'Lorenzo Prieto', '55555555D', '600555554', 'bruno.lorenzo@demo.test','Contabilidad',   27000, TRUE),
(5, 'Inés',   'Galán Fuentes',  '55555555E', '600555555', 'ines.galan@demo.test',   'Recepción',      22500, TRUE);