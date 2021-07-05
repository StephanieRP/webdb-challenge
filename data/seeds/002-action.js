exports.seed = function(knex) {
  return knex("action").insert([
    {
      project_id: 1,
      description: "description for project 1",
      notes: "Notes for action 1"
    },
    {
      project_id: 1,
      description: "description 2 for project 1",
      notes: "Notes for action 2"
    },
    {
      project_id: 1,
      description: "description 1 for project 2",
      notes: "Notes for action 3"
    },
    {
      project_id: 2,
      description: "description 3 for project 2",
      notes: "Notes for action 4"
    },
    {
      project_id: 2,
      description: "description 3 for project 2",
      notes: "Notes for action 5"
    }
  ]);
};
