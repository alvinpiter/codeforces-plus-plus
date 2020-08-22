import React, { useState, useEffect } from 'react'
import ContestPicker from './ContestPicker'
import CircularProgress from '@material-ui/core/CircularProgress'
import { getPastContestList } from '../features/getPastContestList'
import { aggregateStandings } from '../features/aggregateStandings'
import StandingTable from './StandingTable'

export default function StandingsPage() {
  let [isLoadingContests, setIsLoadingContests] = useState(true)
  let [contests, setContests] = useState([])

  let [isLoadingStandings, setIsLoadingStandings] = useState(false)
  let [standings, setStandings] = useState(null)

  const onPicked = (contest) => {
    setIsLoadingStandings(true)

    const loadStandings = async (contest) => {
      const standings = await aggregateStandings(contest.id)
      setIsLoadingStandings(false)
      setStandings(standings)
    }

    loadStandings(contest)
  }

  useEffect(() => {
    let prom = getPastContestList()
    prom.then(contests => {
      setIsLoadingContests(false)
      setContests(contests)
    })
  }, [])

  return (
    <div>
      {
        isLoadingContests ?
        <CircularProgress /> :
        <ContestPicker contests={contests} onPicked={onPicked}/>
      }
      {
        isLoadingStandings ?
        <CircularProgress /> :
        <StandingTable standings={standings} />
      }
    </div>
  )
}
