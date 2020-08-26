import {
  getUserRatingHistory,
  getContestStandings
} from '../api/codeforces'

export async function getCommonContests(firstHandle, secondHandle) {
  const firstRatingHistory = await getUserRatingHistory(firstHandle)
  const secondRatingHistory = await getUserRatingHistory(secondHandle)

  let firstRatingChangeMap = getRatingChangeMap(firstRatingHistory)
  let secondRatingChangeMap = getRatingChangeMap(secondRatingHistory)

  let commonContestIDs = []
  for (let contestID of firstRatingChangeMap.keys()) {
    if (secondRatingChangeMap.has(contestID))
      commonContestIDs.push(contestID)
  }

  //pick 7 largest contestID
  commonContestIDs.sort((a, b) => b - a)
  commonContestIDs = commonContestIDs.slice(0, 7)

  let contestStandingsPromise = []
  for (let contestID of commonContestIDs) {
    await new Promise(resolve => setTimeout(resolve, 500))
    contestStandingsPromise.push(getContestStandings(contestID, {
      handles: [firstHandle, secondHandle]
    }))
  }

  let result = []
  for (let promise of contestStandingsPromise) {
    const contestStandings = await promise

    let currentResult = {}
    currentResult.contest = contestStandings.contest
    currentResult.problems = contestStandings.problems

    let firstUserStatistic = getUserStatistic(firstHandle, contestStandings.rows)
    firstUserStatistic.ratingChange = firstRatingChangeMap.get(contestStandings.contest.id)
    currentResult.firstUserStatistic = firstUserStatistic

    let secondUserStatistic = getUserStatistic(secondHandle, contestStandings.rows)
    secondUserStatistic.ratingChange = secondRatingChangeMap.get(contestStandings.contest.id)
    currentResult.secondUserStatistic = secondUserStatistic

    result.push(currentResult)
  }

  return result
}

function getRatingChangeMap(history) {
  let ratingChangeMap = new Map()
  for (let h of history) {
    ratingChangeMap.set(h.contestId, {
      oldRating: h.oldRating,
      newRating: h.newRating
    })
  }

  return ratingChangeMap
}

function getUserStatistic(handle, ranklistRows) {
  for (let row of ranklistRows) {
    if (row.party.members[0].handle === handle) {
      return {
        handle: handle,
        rank: row.rank,
        problemResults: row.problemResults
      }
    }
  }
}
