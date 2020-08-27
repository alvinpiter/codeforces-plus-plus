import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { getCommonContests } from '../features/getCommonContests'
import CircularProgress from '@material-ui/core/CircularProgress'
import CommonContests from './CommonContests'
import { compare } from '../features/compare'
import ProblemTableWithFilterForm from './ProblemTableWithFilterForm'

export default function ComparePage(props) {
  const [userHandle, setUserHandle] = useState(null)
  const [rivalHandle, setRivalHandle] = useState(null)

  const [isLoadingProblems, setIsLoadingProblems] = useState(false)
  const [problems, setProblems] = useState([])

  const [isLoadingCommonContests, setIsLoadingCommonContests] = useState(false)
  const [commonContests, setCommonContests] = useState([])

  const onSubmit = () => {
    const loadProblems = async(user, rival) => {
      setIsLoadingProblems(true)

      const probs = await compare(user, rival)

      setIsLoadingProblems(false)
      setProblems(probs)
    }

    const loadCommonContests = async (user, rival) => {
      setIsLoadingCommonContests(true)

      const contests = await getCommonContests(user, rival)

      setIsLoadingCommonContests(false)
      setCommonContests(contests)
    }

    loadProblems(userHandle, rivalHandle)
    loadCommonContests(userHandle, rivalHandle)
  }

  return (
    <div>
      <div className="flex space-x-2">
        <TextField
          label="Handle"
          placeholder="Example: tourist"
          onChange={e => setUserHandle(e.target.value)}
        />

        <TextField
          label="Rival handle"
          placeholder="Example: Petr"
          onChange={e => setRivalHandle(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Submit
        </Button>
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
          firstHandle={userHandle}
          secondHandle={rivalHandle}
          commonContests={commonContests}
        />
      }
    </div>
  )
}
