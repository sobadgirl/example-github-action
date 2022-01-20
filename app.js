/**
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.log("Yay! The app was loaded! hhh, v0.0.1");

  app.on(["issues.opened", "issues.reopened"], async (context) => {
    app.log("On event issues")
    context.log("Context, On event issues")
    let comment = context.octokit.issues.createComment(
      context.issue({ body: "Yay, Hello, World! hhhh. from local" })
    );
    context.log("Comment is: ", comment)
  });


  app.on(["pull_request.opened", "pull_request.edited", "pull_request.reopened"], async (context) => {
    app.log("On Event PR!!")
    let pr = await context.octokit.pulls.get(context.pullRequest())
    pr = context.payload.pull_request


    // do your checks
    // here only check if "SUCCESS" in pr title
    let conclusion = pr.title.indexOf("SUCCESS") >= 0 ? "success" : "failure"

    // for urgent, just skip this check
    if (pr.title.indexOf("URGENT") >= 0) {
      conclusion = "skipped"
    }

    app.log("Conclusion is" + conclusion)

    let checkRun = await context.octokit.checks.create(context.repo({
      name: "PR Format Checks",
      head_sha: pr.head.sha,
      // status: "in_progress",
      conclusion,
    }))
    context.log("checkRun.id is: " + JSON.stringify(checkRun) + "Nice!!!")
  });
}
