import { get } from './client.js'

const codeforcesBaseURL = 'https://codeforces.com/api'

function problemMapper(problem) {
  return {
    id: `${problem.contestId}${problem.index}`,
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

export async function getUserSubmissions(handle) {
  const url = `${codeforcesBaseURL}/user.status?handle=${handle}`
  const jsonResponse = await get(url)
  const submissions = jsonResponse.result.map(submission => submissionMapper(submission))

  return submissions
}
