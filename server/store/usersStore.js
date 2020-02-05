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

async function getWeight() {
  const { rows: weight } = await client.query('SELECT * FROM weight');
  return weight;
}

async function getWeightByUserId(userId) {
  const { rows: weight } = await client.query(
    `SELECT * FROM weight WHERE user_id = ${userId}`
  );
  return weight;
}

async function getBlood() {
  const { rows: blood_pressure } = await client.query(
    'SELECT * FROM blood_pressure'
  );
  return blood_pressure;
}

async function getWater() {
  const { rows: water } = await client.query('SELECT * FROM glass_water');
  return water;
}

async function getAlcool() {
  const { rows: alcool } = await client.query('SELECT * FROM glass_alcool');
  return alcool;
}

async function getSport() {
  const { rows: sport } = await client.query('SELECT * FROM sport');
  return sport;
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

async function addWeight({ weight, date, user_id }) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO weight (weight, user_id, date) VALUES (${weight}, ${user_id}, '${date}') RETURNING *`
    );
    return rows[0];
  } catch (e) {
    console.error(e);
    client.release();
  }
}

async function addBlood({ blood_pressure, date, user_id }) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO blood_pressure (blood_pressure, user_id, date) VALUES (${blood_pressure}, ${user_id}, '${date}') RETURNING *`
    );
    return rows[0];
  } catch (e) {
    console.error(e);
    client.release();
  }
}

async function addWater({ number_of_drink, date, user_id }) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO glass_water (number_of_drink, user_id, date) VALUES (${number_of_drink}, ${user_id}, '${date}') RETURNING *`
    );
    return rows[0];
  } catch (e) {
    console.error(e);
    client.release();
  }
}

async function addAlcool({ number_of_drink, date, user_id }) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO glass_alcool (number_of_drink, user_id, date) VALUES (${number_of_drink}, ${user_id}, '${date}') RETURNING *`
    );
    return rows[0];
  } catch (e) {
    console.error(e);
    client.release();
  }
}

async function addSport({ workout_name, number_of_workout, date, user_id }) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO sport (workout_name,number_of_workout, user_id, date) VALUES ('${workout_name}', ${number_of_workout},${user_id}, '${date}') RETURNING *`
    );
    return rows[0];
  } catch (e) {
    console.error(e);
    client.release();
  }
}

async function addUserWithWeight({ name, age, height, weight, date }) {
  const { rows } = await client.query(
    `INSERT INTO users (name,age,height) VALUES ('${name}',${age},'${height}') RETURNING *`
  );
  console.log('hello user');
  await client.query(
    `INSERT INTO weight (weight, user_id, date) VALUES (${weight}, ${rows[0].id}, '${date}')`
  );
  return rows[0];
}

module.exports = {
  addUser,
  addWeight,
  addUserWithWeight,
  getDataUsers,
  getWeight,
  getAlcool,
  getBlood,
  getWater,
  getSport,
  getWeightByUserId,
  addBlood,
  addAlcool,
  addWater,
  addSport,
};
