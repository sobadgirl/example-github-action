const core = require('@actions/core');
const { run } = require("@probot/adapter-github-actions");
const app = require("./app");

core.setFailed("手动失败!!")

run(app).catch(error => {
  console.log(error)
  core.setFailed(error.message)
});
