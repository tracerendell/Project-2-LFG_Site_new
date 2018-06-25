create database lfg_db;

USE lfg_db;

CREATE TABLE players
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar 24 is UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE groups
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar 24 is NOT NULL,
    platform varchar 20,
    game_playing varchar 50,
    PRIMARY KEY (id)
    FOREIGN KEY (players_id)
);