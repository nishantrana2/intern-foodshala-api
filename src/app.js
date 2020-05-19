
require("rootpath")();
import express, { request } from "express";
require('./db/mongoose')

import bodyParser from "body-parser";
const jwt = require("./_access/jwt");
const errorHandler = require("./_access/error-handler");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var cors = require("cors");
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Expose-Headers", "Access-Control-Allow-O");

    if (req.header === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({})
    }
    next();
});

app.use(jwt());

app.get("/", (req, res) =>
    res.send(`Node and express server running on port ${PORT}`)
);

app.use('/users', require('./routers/users.controller'));
app.use('/menu', require('./routers/menu.controller'));
app.use('/order', require('./routers/order.controller'));
app.use('/clients', require('./routers/client.controller'));

app.use(errorHandler);
module.exports = app
