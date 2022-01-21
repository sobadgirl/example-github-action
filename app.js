/**
 * @param {import('probot').Probot} app
 */
const check = require('./src/checks');

module.exports = (app) => {
  app.log("\n\n\nPR Format Checker loaded, put *** 'URGENT' *** in PR title to skip this check!\n\n\n");

  app.on(["pull_request.opened", "pull_request.edited", "pull_request.reopened"], async (context) => {
    let pr = await context.octokit.pulls.get(context.pullRequest())
    pr = context.payload.pull_request

    // for urgent, just skip this check
    if (pr.title.indexOf("URGENT") >= 0) {
      app.log("for URGENT, skip!")
      return
    }

    const checkItems = ["lineChanges", "jiraTitle", "body", "tasks"]
    let checkResults = check(pr, checkItems)
    checkResults.forEach((checkR, index) => {
      context.log(`[${checkItems[index]}]: ${checkR}`)
    })
    if (checkResults.filter(cr => cr === false).length !== 0) {
      throw ["PR Format check failure, please check!"]
    }
  });
}
