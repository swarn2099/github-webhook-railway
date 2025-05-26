export async function handleGitHubEvent(event: string, payload: any) {
  if (event === "project_card") {
    const column = payload.project_card.column_name;
    const issueUrl = payload.project_card.content_url;

    if (column === "In Progress" && issueUrl) {
      const issueData = await fetch(issueUrl).then((res) => res.json());
      console.log("TRIGGER_CLAUDE:ISSUE_IN_PROGRESS", {
        number: issueData.number,
        title: issueData.title,
        body: issueData.body,
      });
    }
  }

  if (
    event === "pull_request" &&
    payload.action === "closed" &&
    payload.pull_request.merged
  ) {
    console.log("TRIGGER_CLAUDE:PR_MERGED", {
      number: payload.pull_request.number,
      title: payload.pull_request.title,
      branch: payload.pull_request.head.ref,
    });
  }
}
