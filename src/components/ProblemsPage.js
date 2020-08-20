import React, { useState, useEffect } from 'react'
import { FormGroup, TextField, Button, CircularProgress } from '@material-ui/core'
import { getProblemsetProblems } from '../features/getProblemsetProblems'
import ProblemTableWithFilterForm from './ProblemTableWithFilterForm'
import { getUserProblemIDs } from '../features/getUserProblemIDs'

export default function ProblemsPage() {
  const [handle, setHandle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [allProblems, setAllProblems] = useState([])
  const [userProblemIDs, setUserProblemIDs] = useState(null)

  useEffect(() => {
    const getAllProblems = async () => {
      setIsLoading(true)

      let problems = await getProblemsetProblems()

      setIsLoading(false)
      setAllProblems(problems)
    }

    getAllProblems()
  }, [])

  const onHandleSubmit = () => {
    const getProblems = async (handle) => {
      setIsLoading(true)

      let userProblemIDs = await getUserProblemIDs(handle, allProblems)

      setIsLoading(false)
      setUserProblemIDs(userProblemIDs)
    }

    getProblems(handle)
  }

  const mapIDsToProblems = (ids, problemsMap) => {
    return ids.map(({id, submittedID}) => {
      let problem = problemsMap.get(id)
      return { ... problem, submittedID }
    })
  }

  let allProblemsMap = new Map()
  for (let problem of allProblems)
    allProblemsMap.set(problem.id, problem)

  let notAttemptedProblems = allProblems.slice()
  let attemptedProblems = []
  let solvedProblems = []

  if (userProblemIDs !== null) {
    notAttemptedProblems = mapIDsToProblems(userProblemIDs.notAttemptedProblemIDs, allProblemsMap)
    attemptedProblems = mapIDsToProblems(userProblemIDs.attemptedProblemIDs, allProblemsMap)
    solvedProblems = mapIDsToProblems(userProblemIDs.solvedProblemIDs, allProblemsMap)
  }

  return (
    <div>
      <FormGroup row={true}>
        <TextField
          label="Handle"
          placeholder="Example: tourist"
          onChange={e => setHandle(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={onHandleSubmit}
        > Submit </Button>
      </FormGroup>

      {
        isLoading ?
        <CircularProgress /> :
        <ProblemTableWithFilterForm
          allProblems={allProblems}
          notAttemptedProblems={notAttemptedProblems}
          attemptedProblems={attemptedProblems}
          solvedProblems={solvedProblems}
        />
      }
    </div>
  )
}
