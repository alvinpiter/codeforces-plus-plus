import { get } from './client.js'

const codeforcesBaseURL = 'https://codeforces.com/api'

export async function problemsetProblems() {
  const url = `${codeforcesBaseURL}/problemset.problems`
  const jsonResponse = await get(url)
  const problems = jsonResponse.result

  return problems
}

export async function getUserSubmissions(handle) {
  const url = `${codeforcesBaseURL}/user.status?handle=${handle}`
  const jsonResponse = await get(url)
  const submissions = jsonResponse.result

  return submissions
}

export async function getUserRatingHistory(handle) {
  const url = `${codeforcesBaseURL}/user.rating?handle=${handle}`
  const jsonResponse = await get(url)
  const ratingHistory = jsonResponse.result

  return ratingHistory
}

export async function getUserInfos(handles) {
  const url = `${codeforcesBaseURL}/user.info?handles=${handles.join(';')}`
  const jsonResponse = await get(url)
  const userInfos = jsonResponse.result

  return userInfos
}

export async function getContestList() {
  const url = `${codeforcesBaseURL}/contest.list`
  const jsonResponse = await get(url)
  const contests = jsonResponse.result

  return contests
}

//handles is array of handle
export async function getContestStandings(contestID, handles) {
  const url = `${codeforcesBaseURL}/contest.standings?contestId=${contestID}&handles=${handles.join(';')}`
  const jsonResponse = await get(url)
  const contestStandings = jsonResponse.result

  return contestStandings
}

export async function getContestRatingChanges(contestID) {
  const url = `${codeforcesBaseURL}/contest.ratingChanges?contestId=${contestID}`
  const jsonResponse = await get(url)
  const ratingChanges = jsonResponse.result

  return ratingChanges
}
