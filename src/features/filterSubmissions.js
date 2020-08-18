/*
Given an array of user submissions, filter out unique solved
problems and unique attempted problems. The return will
be an object whose values are array of problems.
*/
export function filterSubmissions(submissions) {
  let solvedProblemIDs = new Set()
  let solvedProblems = []

  let attemptedProblemIDs = new Set()
  let attemptedProblems = []

  for (let submission of submissions) {
    let problem = submission.problem

    if (submission.verdict === "OK") {
      if (!solvedProblemIDs.has(problem.id)) {
        solvedProblemIDs.add(problem.id)
        solvedProblems.push(problem)
      }
    } else {
      if (!attemptedProblemIDs.has(problem.id)) {
        attemptedProblemIDs.add(problem.id)
        attemptedProblems.push(problem)
      }
    }
  }

  return {
    solvedProblems: solvedProblems,
    attemptedProblems: attemptedProblems
  }
}
