/**
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.log("Yay! The app was loaded! ");

  app.on(["issues.opened"], async (context) => {
    return context.octokit.issues.createComment(
      context.issue({ body: "Yay, Hello, World! hhhh." })
    );
  });


  app.on(["pull_request.opened", "pull_request.edited", "pull_request.reopened"], async (context) => {
    let pr = await context.octokit.pulls.get(context.pullRequest())
    pr = context.payload.pull_request


    // do your checks
    // here only check if "SUCCESS" in pr title
    let conclusion = pr.title.indexOf("SUCCESS") >= 0 ? "success" : "failure"

    // for urgent, just skip this check
    if (pr.title.indexOf("URGENT") >= 0) {
      conclusion = "skipped"
    }

    let checkRun = await context.octokit.checks.create(context.repo({
      name: "PR Format Checks",
      head_sha: "785e790500879c6889fef65b034cdbe9556d28f3",
      // status: "in_progress",
      conclusion,
    }))
  });
}
