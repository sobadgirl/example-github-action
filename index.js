const core = require('@actions/core');
const { run } = require("@probot/adapter-github-actions");
const app = require("./app");

run(app).catch(error => {
  console.log(error)
  core.setFailed(error.message)
});
