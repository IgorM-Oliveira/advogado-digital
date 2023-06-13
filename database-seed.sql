CREATE TABLE advogados
(
    id SERIAL,
    name text,
    title text,
    CONSTRAINT advogados_pkey PRIMARY KEY (id)
);

INSERT INTO advogados(name, title) VALUES
 ('Meadow Crystalfreak ', 'Head of Operations'),
 ('Buddy-Ray Perceptor', 'DevRel'),
 ('Prince Flitterbell', 'Marketing Guru');