import React, { useState, useEffect } from 'react'
import StandingTable from './StandingTable'
import { aggregateStandings } from '../features/aggregateStandings'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function StandingsPage() {
  let [isLoading, setIsLoading] = useState(true)
  let [standings, setStandings] = useState()

  useEffect(() => {
    let prom = aggregateStandings(566)
    prom.then(result => {
      setIsLoading(false)
      setStandings(result)
    })
  }, [])

  return (
    <div>
      {
        isLoading ?
        <CircularProgress /> :
        <StandingTable standings={standings} />
      }
    </div>
  )
}
