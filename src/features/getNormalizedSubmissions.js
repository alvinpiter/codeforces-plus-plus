import { getUserSubmissions } from '../api/codeforces'

//problems are given in non increasing order of contestId
//Note that for the same contest, div.1 contest has smaller id than div.2 contest
export async function getNormalizedSubmissions(handle, problems) {
  const submissions = await getUserSubmissions(handle)

  const numProblems = problems.length

  let normalizedSubmissions = []
  for (let submission of submissions) {
    const contestID = submission.problem.contestId

    //skip gym submissions for now
    if (contestID >= 100000)
      continue

    let lo = 0, hi = numProblems - 1, mid
    while (hi >= lo) {
      mid = Math.floor((lo + hi)/2)
      if (problems[mid].contestID > contestID)
        lo = mid + 1
      else
        hi = mid - 1
    }

    //check starting from lo
    let found = false
    for (let idx = lo; idx < Math.min(numProblems, idx + 20); idx++) {
      if (problems[idx].name === submission.problem.name && problems[idx].rating === submission.problem.rating) {
        found = true

        const normalizedSubmission = {
          verdict: submission.verdict,
          problemID: problems[idx].id,
          submittedProblemID: `${submission.problem.contestId}${submission.problem.index}`
        }

        normalizedSubmissions.push(normalizedSubmission)
        break
      }
    }

    if (!found) {
      console.log(`Problem with contestId ${submission.problem.contestId} and name ${submission.problem.name} is not found in problemset problems`)
    }
  }

  return normalizedSubmissions
}