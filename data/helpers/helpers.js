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

const getProject = async (id, res) => {
  try {
    const project = await getProjects()
      .where({ id })
      .first();
    const actions = await getActions().where({ project_id: id });
    return {
      ...project,
      actions
    };
  } catch (error) {
    console.log(error);
  }
};

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
