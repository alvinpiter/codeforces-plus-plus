import { getNormalizedSubmissions } from './getNormalizedSubmissions'
import { filterNormalizedSubmissions } from './filterNormalizedSubmissions'

export async function getUserProblemIDs(handle, problems) {
  const submissions = await getNormalizedSubmissions(handle, problems)
  const solvedAndAttemptedProblemIDs = filterNormalizedSubmissions(submissions)

  return solvedAndAttemptedProblemIDs
}
