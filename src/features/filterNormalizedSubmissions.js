
/*
Normalized submission is an object with following structure:
{
  verdict: "OK",
  problemID: 2,
  submittedProblemID: 3
}

Given an array of normalized submissions, return an object with following structure:
{
  solvedProblemIDs: [
    {id: 1, submittedID: 2},
    ...
  ],
  attemptedProblemIDs: [
    {id: 3, submittedID: 4},
    ...
  ]
}

All ids in solvedProblemIDs and attemptedProblemIDs must be unique.
Prioritize object whose id and submittedID is the same
*/
export function filterNormalizedSubmissions(submissions) {
  let solvedIDsMap = new Map() //map id to submittedID
  for (let sub of submissions) {
    if (sub.verdict === "OK") {
      if (!solvedIDsMap.has(sub.problemID) || sub.problemID === sub.submittedProblemID) {
        solvedIDsMap.set(sub.problemID, sub.submittedProblemID)
      }
    }
  }

  let attemptedIDsMap = new Map() //map id to submittedID
  for (let sub of submissions) {
    if (sub.verdict !== "OK" && !solvedIDsMap.has(sub.problemID)) {
      if (!attemptedIDsMap.has(sub.problemID) || sub.problemID === sub.submittedProblemID) {
        attemptedIDsMap.set(sub.problemID, sub.submittedProblemID)
      }
    }
  }

  let solvedProblemIDs = []
  for (let [key, value] of solvedIDsMap.entries()) {
    solvedProblemIDs.push({id: key, submittedID: value})
  }

  let attemptedProblemIDs = []
  for (let [key, value] of attemptedIDsMap.entries()) {
    attemptedProblemIDs.push({id: key, submittedID: value})
  }

  return {
    solvedProblemIDs: solvedProblemIDs,
    attemptedProblemIDs: attemptedProblemIDs
  }
}
