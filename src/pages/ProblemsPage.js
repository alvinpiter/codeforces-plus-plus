import React, { useState, useEffect } from 'react'
import getProblemsetProblems from '../features/getProblemsetProblems'
import getPersonalizedProblems from '../features/getPersonalizedProblems'
import ProblemTableWithFilterForm from '../components/ProblemTableWithFilterForm'
import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Spinner from '../components/Spinner'
import { TextField, Button } from '@material-ui/core'

export default function ProblemsPage() {
  const [handle, setHandle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [problems, setProblems] = useState([])

  useEffect(() => {
    document.title = 'Codeforces++ | Problems'

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
          <Spinner /> :
          <ProblemTableWithFilterForm problems={problems} />
        }
      </Container>
    </div>
  )
}
