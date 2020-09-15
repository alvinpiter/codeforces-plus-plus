import { getUserInfos, getUserSubmissions } from '../api/codeforces'
import getProblemsetProblems from './getProblemsetProblems'
import normalizeSubmissions from './normalizeSubmissions'

export default async function getPersonalizedProblems(handle) {
  const usersPromise = getUserInfos([handle])
  const problemsPromise = getProblemsetProblems()
  const submissionsPromise = getUserSubmissions(handle)

  const users = await usersPromise
  const problems = await problemsPromise
  const submissions = await submissionsPromise

  const normalizedSubmissions = normalizeSubmissions(submissions, problems)

  let solvedIDsMap = new Map() //maps problem id to submittedProblemID
  for (let sub of normalizedSubmissions) {
    const { verdict, problemID, submittedProblemID } = sub

    if (verdict === "OK") {
      if (!solvedIDsMap.has(problemID) || problemID === submittedProblemID) {
        solvedIDsMap.set(problemID, submittedProblemID)
      }
    }
  }

  let attemptedIDsMap = new Map() //maps problem id to submittedProblemID
  for (let sub of normalizedSubmissions) {
    const { verdict, problemID, submittedProblemID } = sub

    if (verdict !== "OK" && !solvedIDsMap.has(problemID)) {
      if (!attemptedIDsMap.has(problemID) || problemID === submittedProblemID) {
        attemptedIDsMap.set(problemID, submittedProblemID)
      }
    }
  }

  let personalizedProblems = []
  for (let problem of problems) {
    let metadata

    if (attemptedIDsMap.has(problem.id)) {
      metadata = {
        state: -1,
        submittedProblemID: attemptedIDsMap.get(problem.id)
      }
    } else if (solvedIDsMap.has(problem.id)) {
      metadata = {
        state: 1,
        submittedProblemID: solvedIDsMap.get(problem.id)
      }
    } else {
      metadata = {
        state: 0,
        submittedProblemID: null
      }
    }

    personalizedProblems.push({ ...problem, metadata })
  }

  return {
    user: users[0],
    personalizedProblems
  }
}
