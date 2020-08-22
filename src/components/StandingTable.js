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
        <StandingTableHeader contestType={standings.contest.type} problems={standings.problems} />
        <StandingTableBody contestType={standings.contest.type} rows={standings.rows} />
      </Table>
    </TableContainer>
  )
}

//#, Who, AC count, Penalty, Hacks, Rating change, problems
function StandingTableHeader(props) {
  const { problems, contestType } = props

  return (
    <TableHead>
      <TableRow>
        <TableCell> # </TableCell>
        <TableCell> Who </TableCell>
        <TableCell> AC </TableCell>
        <TableCell> {contestType === "ICPC" ? "Penalty" : "Score"} </TableCell>
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
  const { rows, contestType } = props
  return (
    <TableBody>
      {
        rows.map(row =>
          <TableRow key={row.party.members[0].handle}>
            <TableCell> {row.rank} </TableCell>
            <TableCell> {row.party.members[0].handle} </TableCell>
            <TableCell> {row.acceptedProblemCount} </TableCell>
            <TableCell> {contestType === "ICPC" ? row.penalty : row.points} </TableCell>
            <TableCell>
              <HacksCell
                successfulCount={row.successfulHackCount}
                unsuccessfulCount={row.unsuccessfulHackCount}
              />
            </TableCell>
            <TableCell>
              <RatingChangeCell ratingChange={row.ratingChange} />
            </TableCell>
            {
              row.problemResults.map(result =>
                <ProblemResultCell contestType={contestType} result={result} />
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
  const { result, contestType } = props

  const {
    bestSubmissionTimeSeconds,
    rejectedAttemptCount,
    points
  } = result

  if (bestSubmissionTimeSeconds === undefined && rejectedAttemptCount === 0)
    return null
  else {
    const cellBackgroundColor = bestSubmissionTimeSeconds === undefined ? "bg-red-200" : "bg-green-200"
    const rejectedAttemptInfo = <p>{bestSubmissionTimeSeconds === undefined ? "-" : "+"}{rejectedAttemptCount === 0 ? "" : rejectedAttemptCount}</p>
    const pointInfo = bestSubmissionTimeSeconds === undefined ? null : (contestType === "ICPC" ? null : <p>{points}</p>)
    const submissionTimeInfo = bestSubmissionTimeSeconds === undefined ? null : <p>{formatSeconds(bestSubmissionTimeSeconds)}</p>

    return (
      <TableCell className={cellBackgroundColor}>
        <div className="text-center">
          {rejectedAttemptInfo}
          {pointInfo}
          {submissionTimeInfo}
        </div>
      </TableCell>
    )
  }
}

function HacksCell(props) {
  const {
    successfulCount,
    unsuccessfulCount
  } = props

  const successfulCountInfo = <span className="text-green-500">+{successfulCount}</span>
  const unsuccessfulCountInfo = <span className="text-red-500">-{unsuccessfulCount}</span>

  if (successfulCount === 0 && unsuccessfulCount === 0)
    return null
  else if (successfulCount > 0 && unsuccessfulCount > 0)
    return <p>{successfulCountInfo}:{unsuccessfulCountInfo}</p>
  else if (successfulCount > 0)
    return <p>{successfulCountInfo}</p>
  else
    return <p>{unsuccessfulCountInfo}</p>
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
