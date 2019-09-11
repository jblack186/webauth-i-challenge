const cors = require('cors');
const session = require('express-session');
const connectSessionKnex = require('connect-session-knex')


const express = require('express');

const db = require('./data/db-config.js');
const KnexSessionStore = connectSessionKnex(session);
const server = express();


const sessionConfig = {
    name: 'boomshakalaka',
    secret: 'Bible',//should not be hardcoded-  enviroment variable
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true // the browser cant access via js
    },
    resave: false,
    saveUninitialized: false, //mutst be false because you can save peoples cookies anymore cookie monster without asking 
    store: new KnexSessionStore({
        knex: require('./data/db-config.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60     
    })
}

server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

module.exports = server;