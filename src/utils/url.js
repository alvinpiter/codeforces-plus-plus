const codeforcesBaseURL = 'https://codeforces.com'

export function getProfileURL(handle) {
  return `${codeforcesBaseURL}/profile/${handle}`
}

export function getTeamURL(teamID) {
  return `${codeforcesBaseURL}/team/${teamID}`
}

export function getContestURL(contestID) {
  return `${codeforcesBaseURL}/contest/${contestID}`
}

export function getContestProblemURL(contestID, problemIndex) {
  return `${codeforcesBaseURL}/contest/${contestID}/problem/${problemIndex}`
}
