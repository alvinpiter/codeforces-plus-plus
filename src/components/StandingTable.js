import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
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
        <StandingTableHeader problems={standings.problems} />
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
