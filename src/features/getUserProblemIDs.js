import { filterProblems } from './filterProblems'
import { getNormalizedSubmissions } from './getNormalizedSubmissions'
import { filterNormalizedSubmissions } from './filterNormalizedSubmissions'

export async function getUserProblemIDs(handle, problems) {
  const submissions = await getNormalizedSubmissions(handle, problems)
  const solvedAndAttemptedProblemIDs = filterNormalizedSubmissions(submissions)

  const solvedProblemIDs = solvedAndAttemptedProblemIDs.solvedProblemIDs.map(temp => temp.id)
  const attemptedProblemIDs = solvedAndAttemptedProblemIDs.attemptedProblemIDs.map(temp => temp.id)

  const notAttemptedProblems = filterProblems(problems, {
    ids: {
      mode: "EXCLUDE",
      ids: solvedProblemIDs.concat(attemptedProblemIDs)
    }
  })

  return {
    ...solvedAndAttemptedProblemIDs,
    notAttemptedProblemIDs: notAttemptedProblems.map(p => {
      return {
        id: p.id,
        submittedID: null
      }
    })
  }
}
