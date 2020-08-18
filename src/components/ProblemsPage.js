import React, { useState, useEffect } from 'react'
import { FormGroup, TextField, Button, CircularProgress } from '@material-ui/core'
import { getProblemsetProblems } from '../api/codeforces'

export default function ProblemsPage() {
  const [handle, setHandle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [allProblems, setAllProblems] = useState([])

  useEffect(() => {
    const getAllProblems = async () => {
      setIsLoading(true)

      let problems = await getProblemsetProblems()

      setIsLoading(false)
      setAllProblems(problems)
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

      { isLoading && <CircularProgress /> }
    </div>
  )
}
