const { run } = require("@probot/adapter-github-actions");
const app = require("./app");

run(app).catch(error => {
  throw "GOT" + error.message;
  process.exit(1);
});
