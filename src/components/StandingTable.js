import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import Link from '@material-ui/core/Link'

export default function StandingTable(props) {
  const { standings } = props

  console.log(standings)

  if (standings === undefined) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <StandingTableHeader problems={standings.problems} />
        <StandingTableBody rows={standings.rows} />
      </Table>
    </TableContainer>
  )
}

//#, Who, AC count, Penalty, Hacks, Rating change, problems
function StandingTableHeader(props) {
  const { problems } = props
  return (
    <TableHead>
      <TableRow>
        <TableCell> # </TableCell>
        <TableCell> Who </TableCell>
        <TableCell> AC </TableCell>
        <TableCell> Penalty </TableCell>
        <TableCell> Hacks </TableCell>
        <TableCell> Rating change </TableCell>
        {
          problems.map(problem => <ProblemHeader key={problem.index} problem={problem} />)
        }
      </TableRow>
    </TableHead>
  )
}

function StandingTableBody(props) {
  const { rows } = props
  return (
    <TableBody>
      {
        rows.map(row =>
          <TableRow key={row.party.members[0].handle}>
            <TableCell> {row.rank} </TableCell>
            <TableCell> {row.party.members[0].handle} </TableCell>
            <TableCell> Dummy </TableCell>
            <TableCell> Dummy </TableCell>
            <TableCell> Dummy </TableCell>
            <TableCell>
              <RatingChangeCell ratingChange={row.ratingChange} />
            </TableCell>
            {
              row.problemResults.map(result =>
                <ProblemResultCell result={result} />
              )
            }
          </TableRow>
        )
      }
    </TableBody>
  )
}

function ProblemHeader(props) {
  const { problem } = props
  return (
    <TableCell align="center">
      <Tooltip title={problem.name}>
        <Link href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}> {problem.index} </Link>
      </Tooltip>
    </TableCell>
  )
}

function RatingChangeCell(props) {
  const { ratingChange } = props
  const { oldRating, newRating } = ratingChange

  return (
    <p>
      {getRatedSpan(oldRating, oldRating)} ({getRatingChangeSpan(newRating - oldRating)}) {getRatedSpan(newRating, newRating)}
    </p>
  )
}

function ProblemResultCell(props) {
  const { result } = props

  if (result.hasOwnProperty('bestSubmissionTimeSeconds')) {
    //Accepted
    const {
      bestSubmissionTimeSeconds,
      rejectedAttemptCount
    } = result

    const rejectedAttemptCountText = (rejectedAttemptCount > 0 ? rejectedAttemptCount : "")

    return (
      <TableCell className="bg-green-200">
        <div className="text-center">
          <p>+{rejectedAttemptCountText}</p>
          <p>{formatSeconds(bestSubmissionTimeSeconds)}</p>
        </div>
      </TableCell>
    )
  } else if (result.rejectedAttemptCount > 0) {
    //Attempted
    return null
  } else {
    return null
  }
}

function getRatedSpan(text, rating) {
  if (rating < 3000)
    return <span className={getRatingColor(rating)}>{text}</span>
  else
    return getRatedLgmSpan(text)
}

function getRatedLgmSpan(text) {
  text = String(text)
  return (
    <span>{text[0]}<span className="text-red-500">{text.substring(1)}</span></span>
  )
}

function getRatingChangeSpan(diff) {
  return <span
    className={diff >= 0 ? "text-green-500" : "text-red-500"}
  >
    {diff >= 0 ? "+" : ""}{diff}
  </span>
}

function getRatingColor(rating) {
  if (rating < 1200)
    return "text-gray-500"
  else if (rating < 1400)
    return "text-green-500"
  else if (rating < 1600)
    return "text-teal-500"
  else if (rating < 1900)
    return "text-blue-500"
  else if (rating < 2100)
    return "text-purple-500"
  else if (rating < 2400)
    return "text-orange-500"
  else if (rating < 3000)
    return "text-red-500"
}

function formatSeconds(seconds) {
  const hour = Math.floor(seconds/3600)
  const minute = (Math.floor(seconds/60))%60

  const zeroPadded = (number) => {
    if (number < 10)
      return `0${number}`
    else
      return number
  }

  return `${zeroPadded(hour)}:${zeroPadded(minute)}`
}
