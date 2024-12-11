DROP DATABASE IF EXISTS hospital;

CREATE DATABASE hospital;
USE hospital;


CREATE TABLE pacientes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    localidad VARCHAR(200),
    fecha_nacimiento DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- ALTER TABLE productos ADD COLUMN imagen VARCHAR(200) AFTER descripcion;

INSERT INTO alumnos (nombre, localidad, fecha_nacimiento) 
VALUES 
  ('Juan Pérez', 'Montilla', '2000-05-15'),
  ('María López', 'Cordoba', '1999-08-20'),
  ('Carlos Gómez', 'lucena', '2001-11-10');



CREATE TABLE medicos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    especialidad VARCHAR(200),
    perfil ENUM('RESIDENTE','ESPECIALISTA'),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- ALTER TABLE productos ADD COLUMN imagen VARCHAR(200) AFTER descripcion;

INSERT INTO medicos (nombre, especialidad, perfil) 
VALUES 
  ('Ana García', 'atencion primaria', 'RESIDENTE'),
  ('Juan López', 'traumatologo', 'ESPECIALISTA'),
  ('Marta Pérez', 'dermatologo', 'RESIDENTE');