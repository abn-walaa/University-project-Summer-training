const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'sm3',
    port: '5432',
    connectionTimeoutMillis: 10000,
    maxUses: 100,
});
(async () => {
    await pool.connect()
    console.log('Database connected successfully')
})();
module.exports = pool 