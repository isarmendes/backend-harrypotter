CREATE DATABASE harrypotter;

\c harrypotter;

CREATE TABLE bruxo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    casa VARCHAR(100) NOT NULL,
    habilidade VARCHAR (100) NOT NULL,
    sangue VARCHAR(100) NOT NULL,
    patrono VARCHAR (100) NOT NULL
);

INSERT INTO bruxo (nome, idade, casa, habilidade, sangue, patrono) VALUES ('Isadora Mendes', 17, 'Sonserina', 'Magia', 'puro', 'doninha');

CREATE TABLE varinha (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento VARCHAR(100) NOT NULL,
    nucleo VARCHAR(100) NOT NULL,
    data_fabricacao DATE NOT NULL 
);

INSERT INTO varinha (material, comprimento, nucleo, data_fabricacao) VALUES ('parreira', '29 centímetros', 'corda de coração de dragão', '1900-07-22');

