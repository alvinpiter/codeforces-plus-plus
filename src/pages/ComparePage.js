import React, { useState, useEffect } from 'react'
import compare from '../features/compare'
import CommonContests from '../components/CommonContests'
import ProblemTableWithFilterForm from '../components/ProblemTableWithFilterForm'
import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Spinner from '../components/Spinner'
import DisplayIfNotError from '../components/DisplayIfNotError'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'

export default function ComparePage(props) {
  const [handle, setHandle] = useState("")
  const [rivalHandle, setRivalHandle] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [compareResult, setCompareResult] = useState(null)
  const [compareError, setCompareError] = useState(null)

  const [displaySwitch, setDisplaySwitch] = useState(false)
  const [stage, setStage] = useState('NOT_SUBMITTED')

  const [handlePair, setHandlePair] = useState({handle: "", rivalHandle: ""})

  useEffect(() => {
    document.title = 'Codeforces++ | Compare'
  }, [])

  const onSubmit = () => {
    setHandlePair({ handle, rivalHandle })

    setStage('SUBMITTED')
    setCompareError(null)
  }

  const onSwitch = () => {
    setHandlePair({
      handle: rivalHandle,
      rivalHandle: handle
    })

    const temp = rivalHandle
    setRivalHandle(handle)
    setHandle(temp)

    setCompareError(null)
  }

  useEffect(() => {
    if (handlePair.handle !== "" && handlePair.rivalHandle !== "") {
      const loadCompareResult = async(handle, rivalHandle) => {
        try {
          setIsLoading(true)

          const result = await compare(handle, rivalHandle)
          console.log(result)

          setIsLoading(false)
          setCompareResult(result)
        } catch (e) {
          setIsLoading(false)
          setCompareError(e)
        }
      }

      setDisplaySwitch(false)

      loadCompareResult(handlePair.handle, handlePair.rivalHandle)

      setDisplaySwitch(true)
    } else
      return undefined
  }, [handlePair])

  return (
    <div>
      <NavBar activePageIndex={1}/>
      <Container>
        <div className="flex space-x-2">
          <TextField
            label="Handle"
            placeholder="Example: tourist"
            onChange={e => setHandle(e.target.value)}
            value={handle}
          />

          <TextField
            label="Rival handle"
            placeholder="Example: Petr"
            onChange={e => setRivalHandle(e.target.value)}
            value={rivalHandle}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Submit
          </Button>

          {
            displaySwitch ?
            <Button
              variant="contained"
              color="primary"
              onClick={onSwitch}
            > Switch </Button> :
            null
          }
        </div>

        {
          stage === 'SUBMITTED' ?
          (
            compareError === null ?
            null :
            <Alert severity="error">{compareError.message}</Alert>
          ) :
          null
        }

        {
          stage === 'SUBMITTED' ?
          (isLoading ?
            <Spinner />:
            <DisplayIfNotError error={compareError !== null}>
              <CompareResult result={compareResult} />
            </DisplayIfNotError>
          ) :
          null
        }
      </Container>
    </div>
  )
}

function CompareResult(props) {
  const { result } = props
  if (result === null)
    return null

  const { user, rival, problemsDiff, commonContests } = result

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold"> Problems </h1>
        <p> Problems solved by {rival.handle} but not by {user.handle} </p>
        <ProblemTableWithFilterForm problems={problemsDiff} />
      </div>

      <div>
        <h1 className="text-2xl font-bold"> Contests </h1>
        <CommonContests
          firstHandle={user.handle}
          secondHandle={rival.handle}
          commonContests={commonContests}
        />
      </div>
    </div>
  )
}
