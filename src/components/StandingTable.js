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
            <PartyCell
              party={row.party}
              userInfos={row.userInfos}
              ratingChange={row.ratingChange}
            />
            <TableCell> {row.acceptedProblemCount} </TableCell>
            <TableCell> {contestType === "ICPC" ? row.penalty : row.points} </TableCell>
            <HacksCell
              successfulCount={row.successfulHackCount}
              unsuccessfulCount={row.unsuccessfulHackCount}
            />
            <RatingChangeCell ratingChange={row.ratingChange} />
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

function PartyCell(props) {
  const {
    party,
    userInfos,
    ratingChange,
  } = props

  if (party.members.length > 1) {
    //Implement this later
    return null
  } else {
    const handle = party.members[0].handle
    const name = constructName(userInfos[0].firstName, userInfos[0].lastName)
    const rating = ratingChange.oldRating
    return (
      <TableCell>
        <p>{getRatedSpan(handle, rating)} {name === "" ? null : `(${name})`}</p>
      </TableCell>
    )
  }
}

function constructName(firstName, lastName) {
  let name = ""
  if (firstName !== undefined)
    name = name + firstName

  if (lastName !== undefined)
    name = name + (name.length === 0 ? "" : " ") + lastName

  return name
}

function RatingChangeCell(props) {
  const { ratingChange } = props
  const { oldRating, newRating } = ratingChange

  return (
    <TableCell>
      <p>
        {getRatedSpan(oldRating, oldRating)} ({getRatingChangeSpan(newRating - oldRating)}) {getRatedSpan(newRating, newRating)}
      </p>
    </TableCell>
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

  let cell
  if (successfulCount === 0 && unsuccessfulCount === 0)
    cell = null
  else if (successfulCount > 0 && unsuccessfulCount > 0)
    cell = <p>{successfulCountInfo}:{unsuccessfulCountInfo}</p>
  else if (successfulCount > 0)
    cell = <p>{successfulCountInfo}</p>
  else
    cell = <p>{unsuccessfulCountInfo}</p>

  return (
    <TableCell>
      {cell}
    </TableCell>
  )
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
