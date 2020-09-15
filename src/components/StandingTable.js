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
import Hacks from './Hacks'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from './TablePaginationActions'
import { getContestProblemURL } from '../utils/url'

export default function StandingTable(props) {
  const {
    contestType,
    problems,
    rows,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage
  } = props

  let renderedRows =
    rowsPerPage > 0 ?
    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
    rows

  const numberOfColumns = (contestType === "IOI" ? 5 : 6) + problems.length

  return (
    <TableContainer component={Paper}>
      <Table>
        <StandingTableHeader
          contestType={contestType}
          problems={problems}
        />
        <StandingTableBody
          contestType={contestType}
          rows={renderedRows}
        />
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[50, 100, 200, { label: 'All', value: -1 }]}
              colSpan={numberOfColumns}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
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
        {
          contestType === "IOI" ? null : <TableCell> AC </TableCell>
        }
        <TableCell> {contestType === "ICPC" ? "Penalty" : "Score"} </TableCell>
        <TableCell> Hacks </TableCell>
        <TableCell> Rating change </TableCell>
        {
          problems.map((problem, index) =>
            <ProblemHeader
              key={problem.index}
              problem={problem}
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
            {
              contestType === "IOI" ?
              null :
              <TableCell> {row.acceptedProblemCount} </TableCell>
            }
            <TableCell> {contestType === "ICPC" ? row.penalty : row.points} </TableCell>
            <TableCell>
              <Hacks
                successfulCount={row.successfulHackCount}
                unsuccessfulCount={row.unsuccessfulHackCount}
              />
            </TableCell>
            <TableCell>
              {
                row.party.participantType === "CONTESTANT" ?
                <RatingChange ratingChange={row.ratingChange} /> :
                null
              }
            </TableCell>
            {
              row.problemResults.map((result, index) =>
                <TableCell key={index}>
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
  const { problem } = props

  return (
    <TableCell align="center">
      <div>
        <Tooltip title={problem.name}>
          <Link href={getContestProblemURL(problem.contestId, problem.index)} target="_blank"> {problem.index} </Link>
        </Tooltip>
      </div>
    </TableCell>
  )
}
