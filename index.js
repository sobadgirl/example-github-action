const core = require('@actions/core');
const { run } = require("@probot/adapter-github-actions");
const app = require("./app");


run(app).catch(error => {
  console.log("Yes, i catch the exception!")
  core.setFailed("手动失败!!")
  core.setFailed(error.message)
});
