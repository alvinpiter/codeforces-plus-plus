import filterProblems from './filterProblems'
import getPersonalizedProblems from './getPersonalizedProblems'

//Returns an array of problems (with metadata) solved by rivalHandle but not by handle
export default async function compareProblems(handle, rivalHandle) {
  const problems = await getPersonalizedProblems(handle)
  const rivalProblems = await getPersonalizedProblems(rivalHandle)

  const solvedProblems = filterProblems(problems, { state: 1 })
  const rivalSolvedProblems = filterProblems(rivalProblems, { state: 1 })

  const diffProblems = filterProblems(rivalSolvedProblems, {
    ids: {
      mode: 'EXCLUDE',
      ids: solvedProblems.map(p => p.id)
    }
  })

  const result = filterProblems(problems, {
    ids: {
      mode: 'INCLUDE',
      ids: diffProblems.map(p => p.id)
    }
  })

  return result
}
