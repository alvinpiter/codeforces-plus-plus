import compareProblems from './compareProblems'
import getCommonContests from './getCommonContests'
import { getUserInfos } from '../api/codeforces'

export default async function compare(handle, rivalHandle) {
  const problemsDiff = await compareProblems(handle, rivalHandle)
  const commonContests = await getCommonContests(handle, rivalHandle)
  const userInfos = await getUserInfos([handle, rivalHandle])

  return {
    user: userInfos[0],
    rival: userInfos[1],
    problemsDiff: problemsDiff,
    commonContests: commonContests
  }
}
