// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/challenge.sqlite3"
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (connection, done) => {
        connection.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};

//npx knex init
//npx knex migrate: make create_roles_table
//npx knex migrate:latest

//remove a added table
// npx knex migrate:rollback

//seeding
//npx knex seed:make 001-roles
// npx knex seed:run
