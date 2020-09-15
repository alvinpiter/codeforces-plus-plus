import React, { useState, useEffect } from 'react'
import getCommonContests from '../features/getCommonContests'
import compareProblems from '../features/compareProblems'
import CommonContests from '../components/CommonContests'
import ProblemTableWithFilterForm from '../components/ProblemTableWithFilterForm'
import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Spinner from '../components/Spinner'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'

export default function ComparePage(props) {
  const [userHandleValue, setUserHandleValue] = useState("")
  const [submittedUserHandle, setSubmittedUserHandle] = useState("")

  const [rivalHandleValue, setRivalHandleValue] = useState("")
  const [submittedRivalHandle, setSubmittedRivalHandle] = useState("")

  const [isLoadingProblems, setIsLoadingProblems] = useState(false)
  const [problems, setProblems] = useState([])
  const [loadingProblemsError, setLoadingProblemsError] = useState(null)

  const [handlePair, setHandlePair] = useState({user: "", rival: ""})

  const [isLoadingCommonContests, setIsLoadingCommonContests] = useState(false)
  const [commonContests, setCommonContests] = useState([])
  const [loadingCommonContestsError, setLoadingCommonContestsError] = useState(null)

  const [displaySwitch, setDisplaySwitch] = useState(false)
  const [stage, setStage] = useState('NOT_SUBMITTED')

  useEffect(() => {
    document.title = 'Codeforces++ | Compare'
  }, [])

  const onSubmit = () => {
    setHandlePair({
      user: userHandleValue,
      rival: rivalHandleValue
    })

    setStage('SUBMITTED')
    setLoadingProblemsError(null)
    setLoadingCommonContestsError(null)
  }

  const onSwitch = () => {
    setHandlePair({
      user: rivalHandleValue,
      rival: userHandleValue
    })

    const temp = rivalHandleValue
    setRivalHandleValue(userHandleValue)
    setUserHandleValue(temp)
    setLoadingProblemsError(null)
    setLoadingCommonContestsError(null)
  }

  useEffect(() => {
    if (handlePair.user !== "" && handlePair.rival !== "") {
      const loadProblems = async(user, rival) => {
        try {
          setIsLoadingProblems(true)

          const probs = await compareProblems(user, rival)

          setIsLoadingProblems(false)
          setProblems(probs)
          setSubmittedUserHandle(user)
          setSubmittedRivalHandle(rival)
        } catch (e) {
          setIsLoadingProblems(false)
          setLoadingProblemsError(e)
        }
      }

      const loadCommonContests = async (user, rival) => {
        try {
          setIsLoadingCommonContests(true)

          const contests = await getCommonContests(user, rival)

          setIsLoadingCommonContests(false)
          setCommonContests(contests)
          setSubmittedUserHandle(user)
          setSubmittedRivalHandle(rival)
        } catch (e) {
          setIsLoadingCommonContests(false)
          setLoadingCommonContestsError(e)
        }
      }

      setDisplaySwitch(false)

      const { user, rival } = handlePair

      loadProblems(user, rival)
      loadCommonContests(user, rival)

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
            onChange={e => setUserHandleValue(e.target.value)}
            value={userHandleValue}
          />

          <TextField
            label="Rival handle"
            placeholder="Example: Petr"
            onChange={e => setRivalHandleValue(e.target.value)}
            value={rivalHandleValue}
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
            <div>
              {
                loadingProblemsError === null ?
                null :
                <Alert severity="error"> {loadingProblemsError.message} </Alert>
              }

              {
                loadingCommonContestsError === null ?
                null :
                <Alert severity="error"> {loadingCommonContestsError.message} </Alert>
              }
            </div>
          ) :
          null
        }

        {
          stage === 'SUBMITTED' ?
          (isLoadingProblems ?
            <Spinner /> :
            <Errorable error={loadingProblemsError !== null}>
              <h1 className="text-2xl font-bold"> Problems </h1>
              <p> Problems solved by {submittedRivalHandle} but not by {submittedUserHandle} </p>
              <ProblemTableWithFilterForm problems={problems} />
            </Errorable>
          ) :
          null
        }

        {
          stage === 'SUBMITTED' ?
          (isLoadingCommonContests ?
            <Spinner /> :
            <Errorable error={loadingCommonContestsError !== null}>
              <h1 className="text-2xl font-bold"> Contests </h1>
              <CommonContests
                firstHandle={submittedUserHandle}
                secondHandle={submittedRivalHandle}
                commonContests={commonContests}
              />
            </Errorable>
          ) :
          null
        }
      </Container>
    </div>
  )
}

function Errorable(props) {
  const { error } = props

  if (error)
    return null
  else {
    return (
      <div>
        {props.children}
      </div>
    )
  }
}
