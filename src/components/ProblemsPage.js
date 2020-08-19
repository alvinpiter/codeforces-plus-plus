import React, { useState, useEffect } from 'react'
import { FormGroup, TextField, Button, CircularProgress } from '@material-ui/core'
import { getProblemsetProblems } from '../api/codeforces'
import ProblemTableWithFilterForm from './ProblemTableWithFilterForm'

export default function ProblemsPage() {
  const [handle, setHandle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [allProblems, setAllProblems] = useState([])
  const [notAttemptedProblems, setNotAttemptedProblems] = useState([])
  const [attemptedProblems, setAttemptedProblems] = useState([])
  const [solvedProblems, setSolvedProblems] = useState([])

  useEffect(() => {
    const getAllProblems = async () => {
      setIsLoading(true)

      let problems = await getProblemsetProblems()

      setIsLoading(false)
      setAllProblems(problems)
      setNotAttemptedProblems(problems)
    }

    getAllProblems()
  }, [])

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
