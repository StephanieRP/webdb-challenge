const router = require("express").Router();

const db = require("../../data/helpers/helpers.js");

// add a new action to the database
router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const action = await db.addAction(body);
    action
      ? res.status(201).json(action)
      : res.status(400).json({
          message: "Sorry, could not add this project"
        });
    console.log(error);
  } catch (error) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the projects" });
    console.log(error);
  }
});

// get all actions in the database
router.get("/", async (req, res) => {
  try {
    const actions = await db.getActions();
    res.status(200).json(actions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the dishes" });
  }
});

// get actions by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const action = await db.findAction(id);
    res.status(200).json(action);
  } catch (error) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the dishes" });
  }
});

// Delete request to delete actions --> /:id
router.delete("/:id", async (req, res) => {
  try {
    const action = await actionsDB.removeAction(req.params.id);
    action > 0
      ? res.status(204).end()
      : res.status(404).json({
          message: "The action with the specified ID does not exist."
        });
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The action could not be removed"
    });
  }
});

// Put request to edit actions --> /:id
router.put("/:id", async (req, res) => {
  const newAction = req.body;
  try {
    const { id } = req.params;
    const action = await actionsDB.updateAction(id, newAction);
    action
      ? res.status(200).json(newAction)
      : res
          .status(404)
          .json({
            message: "The action with the specified ID does not exist."
          });
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "The action information could not be modified."
    });
  }
});

module.exports = router;
