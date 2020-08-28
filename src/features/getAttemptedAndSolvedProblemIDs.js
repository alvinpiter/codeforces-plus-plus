import { getNormalizedSubmissions } from './getNormalizedSubmissions'

export async function getAttemptedAndSolvedProblemIDs(handle) {
  const submissions = await getNormalizedSubmissions(handle)

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
