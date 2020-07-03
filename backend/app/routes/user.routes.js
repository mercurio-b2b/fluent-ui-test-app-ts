module.exports = app => {

  const user = require("../controllers/user.controller.js");

  app.get("/user/get/", user.getAll);
};