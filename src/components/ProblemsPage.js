import React, { useState, useEffect } from 'react'
import { FormGroup, TextField, Button, CircularProgress } from '@material-ui/core'
import { getProblemsetProblems } from '../features/getProblemsetProblems'
import ProblemTableWithFilterForm from './ProblemTableWithFilterForm'
import { getAttemptedAndSolvedProblemIDs } from '../features/getAttemptedAndSolvedProblemIDs'
import { enhanceProblems } from '../features/enhanceProblems'

export default function ProblemsPage() {
  const [handle, setHandle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [allProblems, setAllProblems] = useState([])
  const [attemptedAndSolvedProblemIDs, setAttemptedAndSolvedProblemIDs] = useState(null)

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

      let attemptedAndSolvedProblemIDs = await getAttemptedAndSolvedProblemIDs(handle)

      setIsLoading(false)
      setAttemptedAndSolvedProblemIDs(attemptedAndSolvedProblemIDs)
    }

    getProblems(handle)
  }

  const enhancedProblems = enhanceProblems(allProblems, attemptedAndSolvedProblemIDs)

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
