import compareProblems from './compareProblems'
import getCommonContests from './getCommonContests'
import { getUserInfos } from '../api/codeforces'

export default async function compare(handle, rivalHandle) {
  const problemsDiffPromise = compareProblems(handle, rivalHandle)
  const commonContestsPromise = getCommonContests(handle, rivalHandle)
  const userInfosPromise = getUserInfos([handle, rivalHandle])

  const userInfos = await userInfosPromise

  return {
    user: userInfos[0],
    rival: userInfos[1],
    problemsDiff: await problemsDiffPromise,
    commonContests: await commonContestsPromise
  }
}
