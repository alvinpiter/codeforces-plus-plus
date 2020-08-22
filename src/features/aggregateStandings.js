import {
  getUserInfos,
  getContestStandings,
  getContestRatingChanges
} from '../api/codeforces'

export async function aggregateStandings(contestID) {
  let standings = await getContestStandings(contestID, [])
  let contestRatingChanges = await getContestRatingChanges(contestID)

  const userRatingChangeMap = getUserRatingChangeMap(contestRatingChanges)
  const userInfoMap = await getUserInfoMap(standings.rows)

  let rankListRows = []
  for (let row of standings.rows) {
    const handle = row.party.members[0].handle

    if (userRatingChangeMap.has(handle))
      row.ratingChange = userRatingChangeMap.get(handle)

    let userInfos = []
    for (let member of row.party.members) {
      userInfos.push(userInfoMap.get(member.handle))
    }

    row.userInfos = userInfos

    let acceptedProblemCount = 0
    for (let result of row.problemResults) {
      if (result.bestSubmissionTimeSeconds !== undefined)
        acceptedProblemCount += 1
    }

    row.acceptedProblemCount = acceptedProblemCount

    rankListRows.push(row)
  }

  standings.rows = rankListRows

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
  for (let row of rankListRows)
    handles.push(row.party.members[0].handle)

  //call user.info API in batch
  let userInfoPromises = []
  let currentHandles = []
  for (let handle of handles) {
    currentHandles.push(handle)

    if (currentHandles.length === 200) {
      userInfoPromises.push(getUserInfos(currentHandles))
      currentHandles = []

      await new Promise(resolve => setTimeout(resolve, 300))
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
      userInfoMap.set(userInfo.handle, userInfo)
    }
  }

  return userInfoMap
}
