import {
  getUserInfos,
  getContestStandings,
  getContestRatingChanges
} from '../api/codeforces'
import { getCountryCode } from '../utils/MyCountryList'

/*
Return object:
{
  contest: {},
  problems: {},
  officialRows: [],
  officialCountries: [],
  unofficialRows: [],
  unofficialCountries: []
}
*/
export async function aggregateStandings(contestID) {
  let officialStandingsPromise = getContestStandings(contestID)
  let unofficialStandingsPromise = getContestStandings(contestID, { showUnofficial: true })

  let contestRatingChanges
  try {
    contestRatingChanges = await getContestRatingChanges(contestID)
  } catch (err) {
    contestRatingChanges = []
  }

  const officialStandings = await officialStandingsPromise
  const unofficialStandings = await unofficialStandingsPromise

  const userRatingChangeMap = getUserRatingChangeMap(contestRatingChanges)

  let handlesSet = new Set()
  for (let row of (await officialStandings).rows) {
    for (let { handle } of row.party.members)
      handlesSet.add(handle)
  }

  for (let row of (await unofficialStandings).rows) {
    for (let { handle } of row.party.members)
      handlesSet.add(handle)
  }

  const userInfoMap = await getUserInfoMap(Array.from(handlesSet))

  //add userInfos and ratingChange to each row
  const enhanceRows = (rows) => {
    for (let row of rows) {
      row.ratingChange = userRatingChangeMap.get(row.party.members[0].handle)

      let userInfos = []
      for (let { handle } of row.party.members)
        userInfos.push(userInfoMap.get(handle))

      row.userInfos = userInfos
    }
  }

  enhanceRows(officialStandings.rows)
  enhanceRows(unofficialStandings.rows)

  const getCountries = (rows) => {
    const countries = new Set()
    for (let row of rows) {
      for (let userInfo of row.userInfos) {
        if (userInfo !== undefined && userInfo.country !== undefined)
          countries.add(userInfo.country)
      }
    }

    return Array.from(countries).sort().map(name => {
      return {
        name: name,
        code: getCountryCode(name)
      }
    })
  }

  const officialCountries = getCountries(officialStandings.rows)
  const unofficialCountries = getCountries(unofficialStandings.rows)

  return {
    contest: officialStandings.contest,
    problems: officialStandings.problems,
    officialRows: officialStandings.rows,
    officialCountries: officialCountries,
    unofficialRows: unofficialStandings.rows,
    unofficialCountries: unofficialCountries
  }
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

async function getUserInfoMap(handles) {
  //call user.info API in batch
  let userInfoPromises = []
  let currentHandles = []
  for (let handle of handles) {
    currentHandles.push(handle)

    if (currentHandles.length === 400) {
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
      userInfo.countryCode = getCountryCode(userInfo.country)
      userInfoMap.set(userInfo.handle, userInfo)
    }
  }

  return userInfoMap
}
