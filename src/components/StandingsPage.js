import React, { useState, useEffect } from 'react'
import ContestPicker from './ContestPicker'
import CircularProgress from '@material-ui/core/CircularProgress'
import { getContestList } from '../api/codeforces'

export default function StandingsPage() {
  let [isLoading, setIsLoading] = useState(true)
  let [contests, setContests] = useState([])

  useEffect(() => {
    let prom = getContestList()
    prom.then(contests => {
      setIsLoading(false)
      setContests(contests)
    })
  }, [])

  return (
    <div>
      {
        isLoading ?
        <CircularProgress /> :
        <ContestPicker contests={contests} />
      }
    </div>
  )
}
