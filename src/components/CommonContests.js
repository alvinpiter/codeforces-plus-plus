import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import ProblemResult from './ProblemResult'

export default function CommonContests(props) {
  const { firstHandle, secondHandle, commonContests } = props

  if (commonContests.length === 0)
    return null

  let numContests = commonContests.length
  let numFirstWin = 0
  for (let contest of commonContests) {
    const firstRank = contest.firstUserStatistic.rank
    const secondRank = contest.secondUserStatistic.rank

    if (firstRank < secondRank)
      numFirstWin += 1
  }

  return (
    <div>
      <p> {firstHandle} wins against {secondHandle} {numFirstWin} times in their last {numContests} common contests </p>
      <CommonContest contest={commonContests[0]} />
    </div>
  )
}

function CommonContest(props) {
  const { contest } = props
  const { firstUserStatistic, secondUserStatistic } = contest

  const table =
    <TableContainer component={Paper} >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className="w-1/4"> {null} </TableCell>
            <TableCell align="center"> {firstUserStatistic.handle} </TableCell>
            <TableCell align="center"> {secondUserStatistic.handle} </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell> Rank </TableCell>
            <TableCell align="center"> {firstUserStatistic.rank} </TableCell>
            <TableCell align="center"> {secondUserStatistic.rank} </TableCell>
          </TableRow>

          <TableRow>
            <TableCell> Rating change </TableCell>
            <TableCell align="center"> TODO </TableCell>
            <TableCell align="center"> TODO </TableCell>
          </TableRow>

          {
            contest.problems.map((problem, index) => {
              return (
                <TableRow>
                  <TableCell>
                    <Link href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}>
                      {problem.index}. {problem.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                      <ProblemResult
                        result={firstUserStatistic.problemResults[index]}
                        stacked={false}
                      />
                    </TableCell>
                    <TableCell>
                      <ProblemResult
                        result={secondUserStatistic.problemResults[index]}
                        stacked={false}
                      />
                    </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>

  return (
    <div>
      {table}
    </div>
  )
}
