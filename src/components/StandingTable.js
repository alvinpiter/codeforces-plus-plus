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
import RatingChange from './RatingChange'
import Party from './Party'
import ProblemResult from './ProblemResult'

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
            <TableCell className={row.party.participantType === "CONTESTANT" ? null : "bg-red-200"}>
              <Party
                party={row.party}
                userInfos={row.userInfos}
                ratingChange={row.ratingChange}
              />
            </TableCell>
            <TableCell> {row.acceptedProblemCount} </TableCell>
            <TableCell> {contestType === "ICPC" ? row.penalty : row.points} </TableCell>
            <HacksCell
              successfulCount={row.successfulHackCount}
              unsuccessfulCount={row.unsuccessfulHackCount}
            />
            <TableCell>
              <RatingChange ratingChange={row.ratingChange} />
            </TableCell>
            {
              row.problemResults.map(result =>
                <TableCell>
                  <ProblemResult result={result} type={contestType} />
                </TableCell>
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
