import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { commonContests } from '../features/commonContests'
import CircularProgress from '@material-ui/core/CircularProgress'
import CommonContests from './CommonContests'

export default function ComparePage(props) {
  const [userHandle, setUserHandle] = useState(null)
  const [rivalHandle, setRivalHandle] = useState(null)

  const [isLoadingCommonContests, setIsLoadingCommonContests] = useState(false)
  const [commonContests, setCommonContests] = useState([])

  const onSubmit = () => {
    const loadCommonContests = async (user, rival) => {
      setIsLoadingCommonContests(true)

      const contests = await commonContests(user, rival)

      setIsLoadingCommonContests(false)
      setCommonContests(contests)
    }

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
        isLoadingCommonContests ?
        <CircularProgress /> :
        <CommonContests />
      }
    </div>
  )
}
