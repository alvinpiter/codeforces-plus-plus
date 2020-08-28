export function enhanceProblems(problems, attemptedAndSolvedProblemIDs) {
  const attemptedProblemsMap = new Map()
  const solvedProblemsMap = new Map()

  if (attemptedAndSolvedProblemIDs !== null) {
    for (let { id, submittedID } of attemptedAndSolvedProblemIDs.attemptedProblemIDs)
      attemptedProblemsMap.set(id, submittedID)

    for (let { id, submittedID } of attemptedAndSolvedProblemIDs.solvedProblemIDs)
      solvedProblemsMap.set(id, submittedID)
  }

  let enhancedProblems = []
  for (let problem of problems) {
    let submittedID, state

    if (attemptedProblemsMap.has(problem.id)) {
      submittedID = attemptedProblemsMap.get(problem.id)
      state = -1
    } else if (solvedProblemsMap.has(problem.id)) {
      submittedID = solvedProblemsMap.get(problem.id)
      state = 1
    } else {
      submittedID = null
      state = 0
    }

    enhancedProblems.push({
      ...problem,
      submittedID: submittedID,
      state: state
    })
  }

  return enhancedProblems
}
