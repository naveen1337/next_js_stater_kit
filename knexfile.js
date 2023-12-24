require('dotenv').config();


const config = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: './seeds/'
  }
  },
  staging: {
    client: "postgresql",
    connection: {
      database: "",
      user: "",
      password: "",
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: './seeds/'
  }
  },
  production: {
    client: "postgresql",
    connection: {
      database: "",
      user: "",
      password: '',
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: './seeds/'
  }
  },
};

module.exports = config;