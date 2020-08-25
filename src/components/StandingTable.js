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
import ReactCountryFlag from 'react-country-flag'

export default function StandingTable(props) {
  const {
    contestType,
    problems,
    problemStatistics,
    rows
  } = props

  return (
    <TableContainer component={Paper}>
      <Table>
        <StandingTableHeader
          contestType={contestType}
          problems={problems}
          problemStatistics={problemStatistics}
        />
        <StandingTableBody
          contestType={contestType}
          rows={rows}
        />
      </Table>
    </TableContainer>
  )
}

//#, Who, AC count, Penalty, Hacks, Rating change, problems
function StandingTableHeader(props) {
  const { problems, problemStatistics, contestType } = props

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
          problems.map((problem, index) =>
            <ProblemHeader
              key={problem.index}
              problem={problem}
              problemStatistic={problemStatistics[index]}
            />)
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
  const { problem, problemStatistic } = props

  const acceptedInfo = <span className="text-green-500">{problemStatistic.accepted}</span>
  const triedInfo = <span className="text-red-500">{problemStatistic.tried}</span>

  return (
    <TableCell align="center">
      <div>
        <Tooltip title={problem.name}>
          <Link href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}> {problem.index} </Link>
        </Tooltip>
        <p>{acceptedInfo}/{triedInfo}</p>
      </div>
    </TableCell>
  )
}

function CountryFlag(props) {
  const { countryCode } = props
  if (countryCode === undefined)
    return null
  else
    return <ReactCountryFlag countryCode={countryCode} />
}

function PartyCell(props) {
  const {
    party,
    userInfos,
    ratingChange,
  } = props

  let teamInfo = null
  if (party.teamId !== undefined) {
    teamInfo =
      <p>
        <Link href={`https://codeforces.com/team/${party.teamId}`}>
          {party.teamName}:
        </Link>
      </p>
  }

  let membersInfo = party.members.map((member, index) => {
    const handle = member.handle
    const name = constructName(userInfos[index].firstName, userInfos[index].lastName)
    const countryCode = userInfos[index].countryCode
    const rating =
      (ratingChange && ratingChange.oldRating) ||
      userInfos[index].rating ||
      0

    const flagComponent = <CountryFlag countryCode={countryCode} />

    const handleComponent =
      <Link href={`https://codeforces.com/profile/${handle}`} >
        {getRatedSpan(handle, rating)}
      </Link>

    const nameComponent = (name === "" ? null : `(${name})`)

    return <p key={handle}>{flagComponent} {handleComponent} {nameComponent}</p>
  })

  const isOfficial = (party.participantType === "CONTESTANT")

  return (
    <TableCell className={isOfficial ? null : "bg-red-200"}>
      <div>
        {teamInfo}
        {membersInfo}
      </div>
    </TableCell>
  )
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
  if (ratingChange === undefined)
    return <TableCell> {null} </TableCell>

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
    return <TableCell></TableCell>
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
  if (rating === 0)
    return ""
  else if (rating < 1200)
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
