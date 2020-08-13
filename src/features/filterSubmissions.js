/*
Given an array of user submissions, filter out unique solved
problem IDs and unique attempted problem IDs. The return will
be an object whose values are Sets.
*/
export function filterSubmissions(submissions) {
  let solvedProblemIDs = new Set()
  for (let submission of submissions) {
    let problemID = submission.problem.id

    if (submission.verdict === "OK") {
      solvedProblemIDs.add(problemID)
    }
  }

  let attemptedProblemIDs = new Set()
  for (let submission of submissions) {
    let problemID = submission.problem.id

    if (submission.verdict !== "OK" && !solvedProblemIDs.has(problemID)) {
      attemptedProblemIDs.add(problemID)
    }
  }

  return {
    solvedProblemIDs: solvedProblemIDs,
    attemptedProblemIDs: attemptedProblemIDs
  }
}
