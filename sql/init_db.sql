- Создание базы данных и таблиц (DDL)
DROP DATABASE IF EXISTS mevn_internet_shop;
CREATE DATABASE mevn_internet_shop;
USE mevn_internet_shop;

-- Таблица пользователей
DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
    firstname VARCHAR(200),
    lastname VARCHAR(200),
    email VARCHAR(200) NOT NULL UNIQUE
);