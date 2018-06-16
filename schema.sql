create database lfg_db;

USE lfg_db;

CREATE TABLE players
(
    id int NOT NULL AUTO_INCREMENT,
    name var char 24 is UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE sessions
(
    id int NOT NULL AUTO_INCREMENT,
    name var char 24 is NOT NULL,
    platform var char 20,
    game_playing var char 50,
    PRIMARY KEY (id)
    FOREIGN KEY (players_id)
);