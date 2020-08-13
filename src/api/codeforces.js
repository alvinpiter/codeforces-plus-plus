import { get } from './client.js'

const codeforcesBaseURL = 'https://codeforces.com/api'

function problemMapper(problem) {
  return {
    id: `${problem.contestId}${problem.index}`,
    contestID: problem.contestId,
    name: problem.name,
    rating: problem.rating,
    tags: problem.tags
  }
}

function submissionMapper(submission) {
  return {
    id: submission.id,
    verdict: submission.verdict,
    problem: problemMapper(submission.problem)
  }
}

export async function getProblemsetProblems() {
  const url = `${codeforcesBaseURL}/problemset.problems`
  const jsonResponse = await get(url)
  const problems = jsonResponse.result.problems.map(problemMapper)

  return problems
}

export async function getUserSubmissions(handle) {
  const url = `${codeforcesBaseURL}/user.status?handle=${handle}`
  const jsonResponse = await get(url)
  const submissions = jsonResponse.result.map(submissionMapper)

  return submissions
}
