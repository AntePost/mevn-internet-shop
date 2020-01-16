'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const config = require(path.resolve(__dirname, '..', 'config', 'config.js'));
const { User } = require(path.resolve(__dirname, '..', 'models', 'index.js'));
const cors = require('cors');

const connection = mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
})
connection.connect();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) throw error;
        const users = [];
        results.forEach(el => {
            users.push(new User(
                el.id,
                el.firstname,
                el.lastname,
                el.email
            ));
        });
        res.send(users);
    });
});

app.get('/users/:id', (req, res) => {
    const sqlQuery = 'SELECT * FROM users WHERE id = ?';
    connection.query(sqlQuery, [ req.params.id ], (error, results, fields) => {
        if (error) throw error;
        const user = new User(
            results[0].id,
            results[0].firstname,
            results[0].lastname,
            results[0].email
        );
        res.send(user);
    });
});

app.post('/users/add', (req, res) => {
    const user = new User(
        req.body.firstname,
        req.body.lastname,
        req.body.email
    );
    const sqlQuery = 'INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)';
    connection.query(sqlQuery,
    [
        user.firstName,
        user.lastName,
        user.email,
    ],
    (error, results, fields) => {
        if (error) throw error;
        res.send(user);
    });
});

app.put('/users/:id/edit', (req, res) => {
    const user = new User(
        req.body.firstname,
        req.body.lastname,
        req.body.email
    );
    const sqlQuery = `UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?`;
    connection.query(sqlQuery,
        [
            user.firstName,
            user.lastName,
            user.email,
            req.params.id,
        ],
        (error, results, fields) => {
            if (error) throw error;
            res.send(user);
        });
});

app.delete('/users/:id/delete', (req, res) => {
    const sqlQuery = 'DELETE FROM users WHERE id = :id';
    connection.query(sqlQuery, [ req.params.id ], (error, results, fields) => {
        if (error) throw error;
        res.status(204).send();
    });
});

app.listen(config.portNumber);
