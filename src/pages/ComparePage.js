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

export default function ComparePage(props) {
  const [userHandleValue, setUserHandleValue] = useState("")
  const [rivalHandleValue, setRivalHandleValue] = useState("")

  const [isLoadingProblems, setIsLoadingProblems] = useState(false)
  const [problems, setProblems] = useState([])

  const [handlePair, setHandlePair] = useState({user: "", rival: ""})

  const [isLoadingCommonContests, setIsLoadingCommonContests] = useState(false)
  const [commonContests, setCommonContests] = useState([])

  const [displaySwitch, setDisplaySwitch] = useState(false)
  const [stage, setStage] = useState('NOT_SUBMITTED')

  const onSubmit = () => {
    setHandlePair({
      user: userHandleValue,
      rival: rivalHandleValue
    })

    setStage('SUBMITTED')
  }

  const onSwitch = () => {
    setHandlePair({
      user: rivalHandleValue,
      rival: userHandleValue
    })

    const temp = rivalHandleValue
    setRivalHandleValue(userHandleValue)
    setUserHandleValue(temp)
  }

  useEffect(() => {
    if (handlePair.user !== "" && handlePair.rival !== "") {
      const loadProblems = async(user, rival) => {
        setIsLoadingProblems(true)

        const probs = await compareProblems(user, rival)

        setIsLoadingProblems(false)
        setProblems(probs)
      }

      const loadCommonContests = async (user, rival) => {
        setIsLoadingCommonContests(true)

        const contests = await getCommonContests(user, rival)

        setIsLoadingCommonContests(false)
        setCommonContests(contests)
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
          (isLoadingProblems ?
            <Spinner /> :
            <div>
              <h1 className="text-2xl font-bold"> Problems </h1>
              <p> Problems solved by {rivalHandleValue} but not by {userHandleValue} </p>
              <ProblemTableWithFilterForm problems={problems} />
            </div>
          ) :
          null
        }

        {
          stage === 'SUBMITTED' ?
          (isLoadingCommonContests ?
            <Spinner /> :
            <div>
              <h1 className="text-2xl font-bold"> Contests </h1>
              <CommonContests
                firstHandle={userHandleValue}
                secondHandle={rivalHandleValue}
                commonContests={commonContests}
              />
            </div>
          ) :
          null
        }
      </Container>
    </div>
  )
}
