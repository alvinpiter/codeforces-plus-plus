import React, { useState, useEffect } from 'react'
import { FormGroup, TextField, Button, CircularProgress } from '@material-ui/core'
import { problemsetProblems } from '../api/codeforces'
import ProblemTableWithFilterForm from './ProblemTableWithFilterForm'
import { getUserProblems } from '../features/userProblems'

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

      let problems = await problemsetProblems()

      setIsLoading(false)
      setAllProblems(problems)
      setNotAttemptedProblems(problems)
    }

    getAllProblems()
  }, [])

  const onHandleSubmit = () => {
    const getProblems = async (handle) => {
      setIsLoading(true)

      let userProblems = await getUserProblems(handle)

      setIsLoading(false)
      setNotAttemptedProblems(userProblems.notAttemptedProblems)
      setAttemptedProblems(userProblems.attemptedProblems)
      setSolvedProblems(userProblems.solvedProblems)
    }

    getProblems(handle)
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
