DROP DATABASE IF EXIST movie_db;
CREATE DATABASE movie_db;

USE DATABASE movie_db;

CREATE TABLE movies (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    movie_name VARCHAR(100)
);

CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    review TEXT,
    FOREIGN KEY movie_id 
    REFERENCES movies (id) 
    ON DELETE SET NULL
);