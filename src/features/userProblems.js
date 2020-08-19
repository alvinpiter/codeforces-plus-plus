import { filterSubmissions } from './filterSubmissions'
import { filterProblems } from './filterProblems'
import { getProblemsetProblems, getUserSubmissions } from '../api/codeforces'

export async function getUserProblems(handle) {
  const allProblems = await getProblemsetProblems()
  const submissions = await getUserSubmissions(handle)
  const attemptedAndSolvedProblems = filterSubmissions(submissions)

  let attemptedAndSolvedProblemIDs = new Set()
  for (let problem of attemptedAndSolvedProblems.attemptedProblems)
    attemptedAndSolvedProblemIDs.add(problem.id)

  for (let problem of attemptedAndSolvedProblems.solvedProblems)
    attemptedAndSolvedProblemIDs.add(problem.id)

  const notAttemptedProblems = filterProblems(allProblems, {
    ids: {
      mode: "EXCLUDE",
      ids: Array.from(attemptedAndSolvedProblemIDs)
    }
  })

  return {
    ...attemptedAndSolvedProblems,
    notAttemptedProblems
  }
}
