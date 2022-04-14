const pgp = require("pg-promise")();
require("dotenv").config();

// const cn = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PWD}@localhost:5432/api`;

const cn = `postgres://${process.env.ELEPHANT_USER}:${process.env.ELEPHANT_PWD}@hattie.db.elephantsql.com/${process.env.ELEPHANT_USER}`;

const db = pgp(cn);

module.exports = db;
