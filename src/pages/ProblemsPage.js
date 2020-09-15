import React, { useState, useEffect } from 'react'
import getProblemsetProblems from '../features/getProblemsetProblems'
import getPersonalizedProblems from '../features/getPersonalizedProblems'
import ProblemTableWithFilterForm from '../components/ProblemTableWithFilterForm'
import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Spinner from '../components/Spinner'
import HandleSpan from '../components/HandleSpan'
import { TextField, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

export default function ProblemsPage() {
  const [handle, setHandle] = useState('')
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [problems, setProblems] = useState([])

  useEffect(() => {
    document.title = 'Codeforces++ | Problems'

    const getProblems = async () => {
      try {
        setIsLoading(true)

        const problems = await getProblemsetProblems()

        setIsLoading(false)
        setError(null)
        setProblems(problems)
      } catch (e) {
        setIsLoading(false)
        setError(e)
      }
    }

    getProblems()
  }, [])

  const onHandleSubmit = () => {
    const getProblems = async (handle) => {
      try {
        setIsLoading(true)

        const result = await getPersonalizedProblems(handle)

        setIsLoading(false)
        setError(null)
        setUser(result.user)
        setProblems(result.personalizedProblems)
      } catch (e) {
        setIsLoading(false)
        setError(e)
      }
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
            placeholder="Example: alvinpiter"
            onChange={e => setHandle(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={onHandleSubmit}
          > Submit </Button>
        </div>

        {
          isLoading || error === null ?
          null :
          <Alert severity='error'> {error.message} </Alert>
        }

        {
          isLoading ?
          <Spinner /> :
          <div>
            {
              user === null ?
              null :
              <h1 className="text-2xl font-bold"> Personalized problems for <HandleSpan userInfo={user} /> </h1>
            }
            <ProblemTableWithFilterForm problems={problems} />
          </div>
        }
      </Container>
    </div>
  )
}
