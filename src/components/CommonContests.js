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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RatingChange from './RatingChange'
import { ratedFormat } from '../utils/rating'
import {
  getContestURL,
  getContestProblemURL
} from '../utils/url'
import HandleSpan from './HandleSpan'

export default function CommonContests(props) {
  const { firstUser, secondUser, commonContests } = props

  const firstUserSpan = <HandleSpan userInfo={firstUser}/>
  const secondUserSpan = <HandleSpan userInfo={secondUser} />

  if (commonContests.length === 0) {
    return (
      <div>
        <h1> {firstUserSpan} and {secondUserSpan} has never participated in the same contest </h1>
      </div>
    )
  }

  let numContests = commonContests.length
  let numFirstWin = 0
  for (let contest of commonContests) {
    const firstRank = contest.firstUserStatistic.rank
    const secondRank = contest.secondUserStatistic.rank

    if (firstRank < secondRank)
      numFirstWin += 1
  }

  const commonContestsComponent = commonContests.map(commonContest => {
    return (
      <Accordion key={commonContest.contest.id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Link href={getContestURL(commonContest.contest.id)} target="_blank">
            {commonContest.contest.name}
          </Link>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-full flex justify-center">
            <div className="w-2/3">
              <CommonContest contest={commonContest} />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    )
  })

  return (
    <div className="space-y-4">
      <p> {firstUserSpan} won against {secondUserSpan} {numFirstWin} times in their last {numContests} common contests </p>
      <div className="w-1/2">
        {commonContestsComponent}
      </div>
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
            <TableCell className="w-1/2"> {null} </TableCell>
            <TableCell align="center">
              {ratedFormat(firstUserStatistic.handle, firstUserStatistic.ratingChange.oldRating)}
            </TableCell>
            <TableCell align="center">
              {ratedFormat(secondUserStatistic.handle, secondUserStatistic.ratingChange.oldRating)}
            </TableCell>
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
            <TableCell align="center">
              <RatingChange ratingChange={firstUserStatistic.ratingChange} />
            </TableCell>
            <TableCell align="center">
              <RatingChange ratingChange={secondUserStatistic.ratingChange} />
            </TableCell>
          </TableRow>

          {
            contest.problems.map((problem, index) => {
              return (
                <TableRow key={problem.index}>
                  <TableCell>
                    <Link href={getContestProblemURL(problem.contestId, problem.index)} target="_blank">
                      {problem.index}. {problem.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <ProblemResult
                      result={firstUserStatistic.problemResults[index]}
                      type={contest.type}
                    />
                  </TableCell>
                  <TableCell>
                    <ProblemResult
                      result={secondUserStatistic.problemResults[index]}
                      type={contest.type}
                    />
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>

  return table
}
