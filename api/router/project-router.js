const router = require("express").Router();

const db = require("../../data/helpers/helpers.js");

// add a new project to the database
router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const project = await db.addProject(body);
    project
      ? res.status(201).json(project)
      : res.status(400).json({
          message: "Sorry, could not add this project"
        });
  } catch (error) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the projects" });
    // console.log(error);
  }
});

// get all actions in the database
router.get("/", async (req, res) => {
  try {
    const projects = await db.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the project" });
  }
});

// get project by ID with action from the database
router.get("/:id-action", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await db.getProject(id);
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the project" });
    console.log(error);
  }
});

// Remove request to delete project --> /:id
router.delete("/:id", async (req, res) => {
  try {
    const project = await actionsDB.removeProject(req.params.id);
    project > 0
      ? res.status(204).end()
      : res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The project could not be removed"
    });
  }
});

// Put request to edit project --> /:id
router.put("/:id", async (req, res) => {
  const newProject = req.body;
  try {
    const { id } = req.params;
    const project = await actionsDB.updateProject(id, newProject);
    project
      ? res.status(200).json(newProject)
      : res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "The project information could not be modified."
    });
  }
});

module.exports = router;
