import pg from 'pg'
const {Pool} = pg;

const pool = new Pool({
    user: 'devpgu',
    // host: '10.2.99.240',
    host: '192.168.1.240',
    database: 'rc',
    password: 'devpass123456',
    max: 200, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // How long a connection is allowed to remain idle in the pool (in milliseconds)
    port: 5432,
})

export default pool;