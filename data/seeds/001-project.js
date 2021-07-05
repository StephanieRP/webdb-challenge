exports.seed = function(knex, Promise) {
  return knex("project").insert([
    {
      name: "1st Project",
      description: "1st project description"
    },
    {
      name: "2nd Project",
      description: "2nd project description"
    }
  ]);
};
