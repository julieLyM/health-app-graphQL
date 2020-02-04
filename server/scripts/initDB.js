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

const clearDatabase = async client => {
  try {
    const tables = [
      'users',
      'weight',
      'blood_pressure',
      'glass_water',
      'glass_alcool',
      'sport',
    ];

    await Promise.all(tables.map(table => client.query(`DROP TABLE ${table}`)));
  } catch (e) {
    console.error('Error in clear', e);
  }
};

const createTableDatabase = async () => {
  await client.query(
    `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, age INT, height VARCHAR(30), user_id SERIAL)`
  );

  await client.query(`
      CREATE TABLE weight (id SERIAL PRIMARY KEY, weight INT, date TIMESTAMP, user_id SERIAL)`);

  await client.query(`
      CREATE TABLE blood_pressure (id SERIAL PRIMARY KEY, blood_pressure INT, date TIMESTAMP, user_id SERIAL)`);

  await client.query(
    `CREATE TABLE glass_water (id SERIAL PRIMARY KEY, number_of_drink INT, date TIMESTAMP, user_id SERIAL )`
  );

  await client.query(
    `CREATE TABLE glass_alcool (id SERIAL PRIMARY KEY, number_of_drink INT, date TIMESTAMP, user_id SERIAL )`
  );

  await client.query(
    `CREATE TABLE sport (id SERIAL PRIMARY KEY, workout_name TEXT, number_of_workout INT, date TIMESTAMP, user_id SERIAL )`
  );
  return client;
};

const insertUsers = async client => {
  const users = [
    { id: 1, name: 'julix', age: 34, height: '1m72', user_id: 11 },
    { id: 2, name: 'rebibix', age: 26, height: '1m69', user_id: 22 },
    { id: 3, name: 'melanix', age: 29, height: '1m75', user_id: 33 },
    { id: 4, name: 'jonix', age: 35, height: '1m80', user_id: 44 },
  ];

  try {
    await Promise.all(
      users.map(({ name, age, height, user_id }) =>
        client.query(
          `INSERT INTO users (name, age, height,user_id ) VALUES ('${name}', ${age},'${height}', ${user_id})`
        )
      )
    );
  } catch (e) {
    console.error('Error in insert user', e);
  }
};

const insertWeight = async client => {
  const weight = [
    {
      weight: 60,
      user_id: 11,
    },
    {
      weight: 60,
      user_id: 22,
    },
    {
      weight: 60,
      user_id: 33,
    },
    {
      weight: 70,
      user_id: 44,
    },
  ];
  try {
    await Promise.all(
      weight.map(({ weight, user_id }) =>
        client.query(
          `INSERT INTO weight (weight,user_id ) VALUES (${weight}, ${user_id})`
        )
      )
    );
  } catch (e) {
    console.error('Error in insert weight', e);
  }
};

const insertBloodPressure = async () => {
  const bloodPressure = [
    { blood_pressure: 11, date: '03/02/2020 12:00', user_id: 11 },
    { blood_pressure: 12, date: '03/02/2020 12:00', user_id: 22 },
    { blood_pressure: 11, date: '03/02/2020 12:00', user_id: 33 },
    { blood_pressure: 11, date: '03/02/2020 12:00', user_id: 44 },
  ];

  try {
    await Promise.all(
      bloodPressure.map(({ blood_pressure, date, user_id }) =>
        client.query(
          `INSERT INTO blood_pressure(blood_pressure, date, user_id) VALUES (${blood_pressure}, '${date}', ${user_id})`
        )
      )
    );
  } catch (error) {
    console.error('Error insert blood pressure', e);
  }
};

const insertDrinkWater = async () => {
  const drinkWater = [
    { number_of_drink: 5, date: '03/02/2020 12:00', user_id: 11 },
    { number_of_drink: 4, date: '03/02/2020 12:00', user_id: 22 },
    { number_of_drink: 7, date: '03/02/2020 12:00', user_id: 33 },
    { number_of_drink: 5, date: '03/02/2020 12:00', user_id: 44 },
  ];

  try {
    await Promise.all(
      drinkWater.map(({ number_of_drink, date, user_id }) =>
        client.query(
          `INSERT INTO glass_water(number_of_drink, date, user_id) VALUES (${number_of_drink}, '${date}', ${user_id})`
        )
      )
    );
  } catch (error) {
    console.error('Error insert drinkWater', e);
  }
};

const insertDrinkAlcool = async () => {
  const drinkAlcool = [
    { number_of_drink: 1, date: '03/02/2020 12:00', user_id: 11 },
    { number_of_drink: 0, date: '03/02/2020 12:00', user_id: 22 },
    { number_of_drink: 1, date: '03/02/2020 12:00', user_id: 33 },
    { number_of_drink: 0, date: '03/02/2020 12:00', user_id: 44 },
  ];

  try {
    await Promise.all(
      drinkAlcool.map(({ number_of_drink, date, user_id }) =>
        client.query(
          `INSERT INTO glass_alcool(number_of_drink, date, user_id) VALUES (${number_of_drink}, '${date}', ${user_id})`
        )
      )
    );
  } catch (error) {
    console.error('Error insert drink alcool', e);
  }
};

const insertSport = async client => {
  const sport = [
    {
      workout_name: 'running',
      number_of_workout: 1,
      date: '2020/12/31 10:00',
      user_id: 11,
    },
    {
      workout_name: 'systemA',
      number_of_workout: 2,
      date: '2020/12/31 10:00',
      user_id: 22,
    },
    {
      workout_name: 'dance',
      number_of_workout: 2,
      date: '2020/12/31 10:00',
      user_id: 33,
    },
    {
      workout_name: 'running',
      number_of_workout: 3,
      date: '2020/12/31 10:00',
      user_id: 44,
    },
  ];

  try {
    await Promise.all(
      sport.map(({ workout_name, number_of_workout, date, user_id }) =>
        client.query(
          `INSERT INTO sport (workout_name,number_of_workout,date,user_id ) VALUES ('${workout_name}',${number_of_workout},'${date}',${user_id})`
        )
      )
    );
  } catch (e) {
    console.error('Error in insert sport', e);
  }
};

const insertDataInDatabase = async client => {
  await insertUsers(client);
  await insertWeight(client);
  await insertBloodPressure(client);
  await insertDrinkWater(client);
  await insertDrinkAlcool(client);
  await insertSport(client);
};

async function initializeDB() {
  const client = await initClient();
  await clearDatabase(client);

  await createTableDatabase(client);
  await insertDataInDatabase(client);
}

initializeDB();
