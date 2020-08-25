import {
  getUserInfos,
  getContestStandings,
  getContestRatingChanges
} from '../api/codeforces'
import { getCountryCode } from '../utils/MyCountryList'

export async function aggregateStandings(contestID, params) {
  let standings = await getContestStandings(contestID, params)

  let contestRatingChanges
  try {
    contestRatingChanges = await getContestRatingChanges(contestID)
  } catch (err) {
    contestRatingChanges = []
  }

  const userRatingChangeMap = getUserRatingChangeMap(contestRatingChanges)
  const userInfoMap = await getUserInfoMap(standings.rows)

  let problemStatistics = []
  for (let i = 0; i < standings.problems.length; i++)
    problemStatistics.push({ accepted: 0, tried: 0 })

  let countriesSet = new Set()

  let rankListRows = []
  for (let row of standings.rows) {
    const handle = row.party.members[0].handle

    if (userRatingChangeMap.has(handle))
      row.ratingChange = userRatingChangeMap.get(handle)

    let userInfos = []
    for (let member of row.party.members) {
      userInfos.push(userInfoMap.get(member.handle))
    }

    if (userInfos.length > 0 && userInfos[0].country !== undefined)
      countriesSet.add(userInfos[0].country)

    row.userInfos = userInfos

    let acceptedProblemCount = 0
    row.problemResults.forEach((result, index) => {
      problemStatistics[index].tried += result.rejectedAttemptCount

      if (result.bestSubmissionTimeSeconds !== undefined) {
        acceptedProblemCount += 1
        problemStatistics[index].accepted += 1
      }
    })

    row.acceptedProblemCount = acceptedProblemCount

    rankListRows.push(row)
  }

  standings.problemStatistics = problemStatistics
  standings.rows = rankListRows

  const sortedCountries = Array.from(countriesSet).sort().map(name => {
    return {
      name: name,
      code: getCountryCode(name)
    }
  })

  standings.countries = sortedCountries

  return standings
}

function getUserRatingChangeMap(contestRatingChanges) {
  let userRatingChangeMap = new Map()
  for (let rc of contestRatingChanges) {
    const handle = rc.handle
    const ratingChange = {
      oldRating: rc.oldRating,
      newRating: rc.newRating
    }

    userRatingChangeMap.set(handle, ratingChange)
  }

  return userRatingChangeMap
}

async function getUserInfoMap(rankListRows) {
  let handles = []
  for (let row of rankListRows) {
    for (let { handle } of row.party.members)
      handles.push(handle)
  }

  //call user.info API in batch
  let userInfoPromises = []
  let currentHandles = []
  for (let handle of handles) {
    currentHandles.push(handle)

    if (currentHandles.length === 200) {
      userInfoPromises.push(getUserInfos(currentHandles))
      currentHandles = []

      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  //check if there is leftovers
  if (currentHandles.length > 0) {
    userInfoPromises.push(getUserInfos(currentHandles))
    currentHandles = []
  }

  let userInfoMap = new Map()
  for (let promise of userInfoPromises) {
    let userInfos
    try {
      userInfos = await promise
    } catch(e) {
      continue
    }

    for (let userInfo of userInfos) {
      userInfo.countryCode = getCountryCode(userInfo.country)
      userInfoMap.set(userInfo.handle, userInfo)
    }
  }

  return userInfoMap
}
