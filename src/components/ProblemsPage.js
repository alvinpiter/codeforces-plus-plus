import React, { useState, useEffect } from 'react'
import { FormGroup, TextField, Button, CircularProgress } from '@material-ui/core'
import { getProblemsetProblems } from '../features/getProblemsetProblems'
import ProblemTableWithFilterForm from './ProblemTableWithFilterForm'
import { getPersonalizedProblems } from '../features/getPersonalizedProblems'
import NavBar from './NavBar'

export default function ProblemsPage() {
  const [handle, setHandle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [problems, setProblems] = useState([])

  useEffect(() => {
    const getProblems = async () => {
      setIsLoading(true)

      const problems = await getProblemsetProblems()

      setIsLoading(false)
      setProblems(problems)
    }

    getProblems()
  }, [])

  const onHandleSubmit = () => {
    const getProblems = async (handle) => {
      setIsLoading(true)

      const personalizedProblems = await getPersonalizedProblems(handle)

      setIsLoading(false)
      setProblems(personalizedProblems)
    }

    getProblems(handle)
  }

  return (
    <div>
      <NavBar activePageIndex={0}/>
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
          problems={problems}
        />
      }
    </div>
  )
}
