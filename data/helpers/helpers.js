const db = require("../dbConfig.js");

////********//////
// Post Request
////********//////

function addProject(project) {
  return db("project").insert(project);
}

function addAction(action) {
  return db("action").insert(action);
}

////********//////
// Get Request
////********//////

function getProjects(project) {
  return db("project");
}

function getActions() {
  return db("action")
    .select(
      "action.id as action_id",
      "action.description",
      "action.notes as action_notes"
    )
    .join("project", "project.id", "action.project_id");
}

function getProject(id) {
  const project = db("project")
    .where({ id })
    .first();

  const action = db("action")
    .join("project", "action.project_id", "project.id")
    .select("action.*")
    .where("project.id", "=", id);

  return Promise.all([project, action]).then(newProject => {
    const [project, action] = newProject;
    return { ...project, action };
  });
}

function getActions(action) {
  return db("action");
}

function findAction(id) {
  return db("action")
    .where({ id })
    .first();
}

////********//////
// Delete Request
////********//////

function removeAction(id) {
  return db("action")
    .where({ id })
    .del();
}

function removeProject(id) {
  return db("project")
    .where({ id })
    .del();
}

////********//////
// Put Request
////********//////

function updateAction(id, changes) {
  return db("action")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findAction(id);
      } else {
        return null;
      }
    });
}

function updateProject(id, changes) {
  return db("project")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return getProject(id);
      } else {
        return null;
      }
    });
}

module.exports = {
  addProject,
  getProjects,
  getActions,
  getProject,
  addAction,
  getActions,
  findAction,
  removeAction,
  removeProject,
  updateAction,
  updateProject
};
