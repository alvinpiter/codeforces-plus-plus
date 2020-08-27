import { getUserSubmissions } from '../api/codeforces.js'
import { filterSubmissions } from './filterSubmissions'
import { filterProblems } from './filterProblems'

//Returns an array of enhanced problems solved by handle2 but not by handle1
export async function compare(handle1, handle2) {
  const firstSubmissions = getUserSubmissions(handle1)
  const secondSubmissions = getUserSubmissions(handle2)

  const firstSolvedProblems = filterSubmissions(await firstSubmissions).solvedProblems
  const secondSolvedProblems = filterSubmissions(await secondSubmissions).solvedProblems

  const firstSolvedProblemIDs = firstSolvedProblems.map(problem => problem.id)

  const diff = filterProblems(secondSolvedProblems, {
    ids: {
      mode: "EXCLUDE",
      ids: firstSolvedProblemIDs
    }
  })

  return diff
}
