exports.up = function(knex) {
  return knex.schema.createTable("action", table => {
    table.increments();

    table
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("project")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");

    table.string("description", 128).notNullable();
    table.text("notes").notNullable();
    table.boolean("completed").defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("action");
};
