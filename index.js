const { run } = require("@probot/adapter-github-actions");
const app = require("./app");

run(app).cache(error => {
  console.error(error)
  process.exit(1);
});
