import React, { useState, useEffect } from 'react'
import { TextField, Button, CircularProgress } from '@material-ui/core'
import { getProblemsetProblems } from '../features/getProblemsetProblems'
import ProblemTableWithFilterForm from '../components/ProblemTableWithFilterForm'
import { getPersonalizedProblems } from '../features/getPersonalizedProblems'
import NavBar from '../components/NavBar'
import Container from '../components/Container'

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
      <Container>
        <div className="flex space-x-2">
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
        </div>

        {
          isLoading ?
          <div className="flex justify-center">
            <CircularProgress size={60} />
          </div> :
          <ProblemTableWithFilterForm problems={problems} />
        }
      </Container>
    </div>
  )
}
