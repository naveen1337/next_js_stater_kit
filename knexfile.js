
const config = {
  development: {
    client: "postgresql",
    connection: {
      database: "finance_ledger",
      user: "postgres",
      password: 'password',
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