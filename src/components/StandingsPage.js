import React, { useState, useEffect } from 'react'
import ContestPicker from './ContestPicker'
import CircularProgress from '@material-ui/core/CircularProgress'
import { getPastContestList } from '../features/getPastContestList'
import { aggregateStandings } from '../features/aggregateStandings'
import StandingTableWithFilter from './StandingTableWithFilter'
import NavBar from './NavBar'

export default function StandingsPage() {
  let [isLoadingContests, setIsLoadingContests] = useState(true)
  let [contests, setContests] = useState([])

  let [isLoadingStandings, setIsLoadingStandings] = useState(false)
  let [standings, setStandings] = useState(null)

  const onPicked = (contest) => {
    const loadStandings = async (contest) => {
      setIsLoadingStandings(true)

      const res = await aggregateStandings(contest.id)

      setIsLoadingStandings(false)
      setStandings(res)
    }

    loadStandings(contest)
  }

  useEffect(() => {
    const loadContests = async () => {
      const contests = await getPastContestList()

      setIsLoadingContests(false)
      setContests(contests)
    }

    loadContests()
  }, [])

  return (
    <div>
      <NavBar activePageIndex={2}/>
      {
        isLoadingContests ?
        <CircularProgress /> :
        <ContestPicker contests={contests} onPicked={onPicked}/>
      }
      {
        isLoadingStandings ?
        <CircularProgress /> :
        (standings === null ?
          null :
          <StandingTableWithFilter standings={standings} />
        )
      }
    </div>
  )
}
