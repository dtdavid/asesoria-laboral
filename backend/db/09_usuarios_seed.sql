INSERT INTO usuarios (email, password_hash, role, status, empresa_id)
VALUES
  ('gestor@demo.test',  '$2b$10$8BW9Vy1L5sRLSPHw0vDJSOllGBrx2PdTUXuyDPQ3TO4ZaWpaWnfMi', 'GESTOR',  'ACTIVO',   NULL),
  ('cliente1@demo.test','$2b$10$8BW9Vy1L5sRLSPHw0vDJSOllGBrx2PdTUXuyDPQ3TO4ZaWpaWnfMi', 'CLIENTE', 'ACTIVO',   1);