import { filterProblems } from './filterProblems'
import { getProblemsetProblems } from './getProblemsetProblems'
import { getAttemptedAndSolvedProblemIDs } from './getAttemptedAndSolvedProblemIDs'
import { enhanceProblems } from './enhanceProblems'

//Returns an array of enhanced problems solved by handle2 but not by handle1
export async function compare(handle1, handle2) {
  const allProblems = await getProblemsetProblems()
  const firstAttemptedAndSolvedProblemIDs = await getAttemptedAndSolvedProblemIDs(handle1)
  const secondAttemptedAndSolvedProblemIDs = await getAttemptedAndSolvedProblemIDs(handle2)

  const solvedProblemsBySecond = filterProblems(allProblems, {
    ids: {
      mode: "INCLUDE",
      ids: secondAttemptedAndSolvedProblemIDs.solvedProblemIDs.map(temp => temp.id)
    }
  })

  const diffProblems = filterProblems(solvedProblemsBySecond, {
    ids: {
      mode: "EXCLUDE",
      ids: firstAttemptedAndSolvedProblemIDs.solvedProblemIDs.map(temp => temp.id)
    }
  })

  return enhanceProblems(diffProblems, firstAttemptedAndSolvedProblemIDs)
}
