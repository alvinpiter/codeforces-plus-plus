import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { getCommonContests } from '../features/getCommonContests'
import CircularProgress from '@material-ui/core/CircularProgress'
import CommonContests from '../components/CommonContests'
import { compareProblems } from '../features/compareProblems'
import ProblemTableWithFilterForm from '../components/ProblemTableWithFilterForm'
import NavBar from '../components/NavBar'

export default function ComparePage(props) {
  const [userHandleValue, setUserHandleValue] = useState("")
  const [rivalHandleValue, setRivalHandleValue] = useState("")

  const [isLoadingProblems, setIsLoadingProblems] = useState(false)
  const [problems, setProblems] = useState([])

  const [handlePair, setHandlePair] = useState({user: "", rival: ""})

  const [isLoadingCommonContests, setIsLoadingCommonContests] = useState(false)
  const [commonContests, setCommonContests] = useState([])

  const [displaySwitch, setDisplaySwitch] = useState(false)

  const onSubmit = () => {
    setHandlePair({
      user: userHandleValue,
      rival: rivalHandleValue
    })
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
        isLoadingProblems ?
        <CircularProgress /> :
        <ProblemTableWithFilterForm problems={problems} />
      }

      {
        isLoadingCommonContests ?
        <CircularProgress /> :
        <CommonContests
          firstHandle={userHandleValue}
          secondHandle={rivalHandleValue}
          commonContests={commonContests}
        />
      }
    </div>
  )
}
