/**
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.log("\n\n\nPR Format Checker loaded, put 'URGENT' in PR title to skip this check!\n\n\n");

  app.on(["pull_request.opened", "pull_request.edited", "pull_request.reopened"], async (context) => {
    let pr = await context.octokit.pulls.get(context.pullRequest())
    pr = context.payload.pull_request

    // for urgent, just skip this check
    if (pr.title.indexOf("URGENT") >= 0) {
      app.log("for URGENT, skip!")
      return
    }

    // do your checks
    // here only check if "SUCCESS" in pr title
    let conclusion = pr.title.indexOf("SUCCESS") >= 0 ? "success" : "failure"

    app.log("Conclusion is " + conclusion)
    if (conclusion === "failure") {
      throw ["PR Title check failure"]
    }
  });
}
