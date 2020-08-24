import React, { useState, useEffect } from 'react'
import ContestPicker from './ContestPicker'
import CircularProgress from '@material-ui/core/CircularProgress'
import { getPastContestList } from '../features/getPastContestList'
import { aggregateStandings } from '../features/aggregateStandings'
import StandingTableWithFilter from './StandingTableWithFilter'

export default function StandingsPage() {
  let [isLoadingContests, setIsLoadingContests] = useState(true)
  let [contests, setContests] = useState([])

  let [isLoadingStandings, setIsLoadingStandings] = useState(false)
  let [officialStandings, setOfficialStandings] = useState(null)
  let [unofficialStandings, setUnofficialStandings] = useState(null)

  const onPicked = (contest) => {
    const loadStandings = async (contest) => {
      setIsLoadingStandings(true)

      const officialStandings = await aggregateStandings(contest.id)
      const unofficialStandings = await aggregateStandings(contest.id, { showUnofficial: true })

      setIsLoadingStandings(false)
      setOfficialStandings(officialStandings)
      setUnofficialStandings(unofficialStandings)
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
      {
        isLoadingContests ?
        <CircularProgress /> :
        <ContestPicker contests={contests} onPicked={onPicked}/>
      }
      {
        isLoadingStandings ?
        <CircularProgress /> :
        (officialStandings === null || unofficialStandings === null ?
          null :
          <StandingTableWithFilter
            officialStandings={officialStandings}
            unofficialStandings={unofficialStandings}
          />
        )
      }
    </div>
  )
}
