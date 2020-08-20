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

  const attemptedProblemsMap = new Map()
  const solvedProblemsMap = new Map()

  if (userProblemIDs !== null) {
    for (let { id, submittedID } of userProblemIDs.attemptedProblemIDs)
      attemptedProblemsMap.set(id, submittedID)

    for (let { id, submittedID } of userProblemIDs.solvedProblemIDs)
      solvedProblemsMap.set(id, submittedID)
  }

  let enhancedProblems = []
  for (let problem of allProblems) {
    let submittedID, state

    if (attemptedProblemsMap.has(problem.id)) {
      submittedID = attemptedProblemsMap.get(problem.id)
      state = -1
    } else if (solvedProblemsMap.has(problem.id)) {
      submittedID = solvedProblemsMap.get(problem.id)
      state = 1
    } else {
      submittedID = null
      state = 0
    }

    enhancedProblems.push({
      ...problem,
      submittedID: submittedID,
      state: state
    })
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
          problems={enhancedProblems}
        />
      }
    </div>
  )
}
