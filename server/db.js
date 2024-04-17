require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'posts',
    port: process.env.DB_PORT || 5432,
    allowExitOnIdle: true,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
