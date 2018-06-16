create database playerProfile_db;

USE playerProfile_db;

CREATE TABLE profiles
(
    profile_name var char 24 is UNIQUE NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (profile_name)
);

CREATE TABLE sessions
(
    session_name int NOT NULL AUTO_INCREMENT;
    platform var char 20
    game var char 50
    PRIMARY KEY (session_name)
);