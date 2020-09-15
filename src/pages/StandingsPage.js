import React, { useState, useEffect } from 'react'
import getPastContestList from '../features/getPastContestList'
import aggregateStandings from '../features/aggregateStandings'
import StandingTableWithFilter from '../components/StandingTableWithFilter'
import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Spinner from '../components/Spinner'
import DisplayIfNotError from '../components/DisplayIfNotError'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'

export default function StandingsPage() {
  let [isLoadingContests, setIsLoadingContests] = useState(true)
  let [contests, setContests] = useState([])
  let [loadingContestsError, setLoadingContestsError] = useState(null)

  let [isLoadingStandings, setIsLoadingStandings] = useState(false)
  let [standings, setStandings] = useState(null)
  let [loadingStandingsError, setLoadingStandingsError] = useState(null)

  const onPicked = (contest) => {
    const loadStandings = async (contest) => {
      try {
        setIsLoadingStandings(true)
        setLoadingStandingsError(null)

        const res = await aggregateStandings(contest.id)

        setIsLoadingStandings(false)
        setStandings(res)
      } catch(e) {
        setIsLoadingStandings(false)
        setLoadingStandingsError(e)
      }
    }

    loadStandings(contest)
  }

  useEffect(() => {
    document.title = 'Codeforces++ | Standings'

    const loadContests = async () => {
      try {
        const contests = await getPastContestList()

        setIsLoadingContests(false)
        setContests(contests)
      } catch(e) {
        setIsLoadingContests(false)
        setLoadingContestsError(e)
      }
    }

    loadContests()
  }, [])

  return (
    <div>
      <NavBar activePageIndex={2}/>
      <Container>
        {
          loadingContestsError === null ?
          null :
          <Alert severity="error"> {loadingContestsError.message} </Alert>
        }

        <div className="flex justify-center">
          {
            isLoadingContests ?
            <Spinner /> :
            <DisplayIfNotError error={loadingContestsError !== null}>
              <ContestPicker contests={contests} onPicked={onPicked}/>
            </DisplayIfNotError>
          }
        </div>

        {
          loadingStandingsError === null ?
          null :
          <Alert severity="error"> {loadingStandingsError.message} </Alert>
        }

        {
          isLoadingStandings ?
          <Spinner /> :
          <DisplayIfNotError error={loadingStandingsError !== null}>
            {
              standings === null ?
              null :
              <StandingTableWithFilter standings={standings} />
            }
          </DisplayIfNotError>
        }
      </Container>
    </div>
  )
}

function ContestPicker(props) {
  const { contests, onPicked } = props
  const [pickedContest, setPickedContest] = useState(null)

  const onAutocompleteChange = (event, obj) => {
    if (obj !== null)
      setPickedContest(obj)
  }

  const onClick = () => {
    if (pickedContest === null)
      return
    else
      onPicked(pickedContest)
  }

  return (
    <div className="flex space-x-2">
      <Autocomplete
        options={contests}
        getOptionLabel={contest => contest.name}
        style={{ width: 500 }}
        renderInput={(params) => <TextField {...params} label="Pick a contest" variant="outlined" /> }
        onChange={onAutocompleteChange}
      />
      <Button variant="contained" color="primary" onClick={onClick}>Submit</Button>
    </div>
  )
}
