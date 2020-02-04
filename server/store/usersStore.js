const { Pool } = require('pg');
let client = null;

const pool = new Pool({
  user: 'healthdb',
  host: 'localhost',
  database: 'healthdb',
  password: 'secret',
  port: 4000,
});

async function initClient() {
  client = await pool.connect();

  return client;
}
initClient();

async function getDataUsers() {
  const { rows: users } = await client.query('SELECT * FROM users');
  return users;
}

async function addUser({ name, age, height }) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO users (name,age,height) VALUES ('${name}',${age},'${height}') RETURNING *`
    );
    return rows[0];
  } catch (e) {
    console.error(e);
    client.release();
  }
}

module.exports = {
  addUser,
  getDataUsers,
};
