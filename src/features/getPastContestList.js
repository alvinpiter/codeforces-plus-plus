import { getContestList } from '../api/codeforces'

export default async function getPastContestList() {
  let contests = await getContestList()
  return contests.filter(contest => contest.phase === "FINISHED")
}
