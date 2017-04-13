-- SHARED USER ACCOUNT

-- CREATE USER 'dbuser'@'localhost' IDENTIFIED BY 'password';
-- GRANT ALL ON bottlestory.* TO 'dbuser'@'localhost';
-- FLUSH PRIVILEGES;


-- DELETE THE DATABASE, IF IT ALREADY EXISTS

DROP DATABASE IF EXISTS bottlestory;

-- CREATE THE DATABSE

CREATE DATABASE bottlestory;

-- CREATE THE TABLES

USE bottlestory;

CREATE TABLE bottles (
    bottleid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bottletext VARCHAR(5000) NOT NULL,
    datecreated DATETIME NOT NULL,
    throwcount INT NOT NULL
);

CREATE TABLE users (
    userid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(500) NOT NULL,
    datecreated DATETIME NOT NULL
);

-- INSERT THE DATA

INSERT INTO bottles VALUES ( null, 'my name is lilian', '2017-04-01 00:00:00', 0);
INSERT INTO bottles VALUES ( null, 'hello from mars', '2017-04-02 00:00:00', 0);

INSERT INTO users VALUES ( null, 'claire', '2017-04-01 00:00:00');
INSERT INTO users VALUES ( null, 'winnie', '2017-04-01 00:00:00');