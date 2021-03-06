import { problemsetProblems } from '../api/codeforces'
import { getContestProblemURL } from '../utils/url'

export default async function getProblemsetProblems() {
  const apiResult = await problemsetProblems()

  let problemSolvedCountMap = new Map()
  for (let statistic of apiResult.problemStatistics) {
    const problemID = `${statistic.contestId}${statistic.index}`
    problemSolvedCountMap.set(problemID, statistic.solvedCount)
  }

  let problems = []
  for (let prob of apiResult.problems) {
    const problemID = `${prob.contestId}${prob.index}`
    const problem = {
      id: problemID,
      contestID: prob.contestId,
      index: prob.index,
      name: prob.name,
      rating: prob.rating || 0,
      solvedCount: problemSolvedCountMap.get(problemID),
      tags: prob.tags,
      url: getContestProblemURL(prob.contestId, prob.index)
    }

    problems.push(problem)
  }

  return problems
}
