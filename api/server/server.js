const express = require("express");
const helmet = require("helmet");

const proRouter = require("../router/project-router.js");
const actRouter = require("../router/action-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/project", proRouter);
server.use("/api/action", actRouter);

// sanity check route
server.get("/", (req, res) => {
  res.status(200).send("Running Challenge database now...");
});

module.exports = server;
