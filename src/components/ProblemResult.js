import React from 'react'
import { formatSeconds } from '../utils/timeFormatter'

/*
type is either CF, ICPC, IOI
*/
export default function ProblemResult(props) {
  const {
    result,
    type
  } = props

  if (type === "IOI") {
    if (!result.hasOwnProperty('bestSubmissionTimeSeconds'))
      return null

    return (
      <div className="text-center">
        {getPointsComponent(result.points, "IOI")}
        {getBestSubmissionTimeComponent(result.bestSubmissionTimeSeconds)}
      </div>
    )
  } else {
    const isAccepted = result.hasOwnProperty('bestSubmissionTimeSeconds')

    if (!isAccepted && result.rejectedAttemptCount === 0)
      return null

    if (type === "ICPC") {
      return (
        <div className="text-center">
          {getRejectedAttemptComponent(result.rejectedAttemptCount, isAccepted)}
          {isAccepted ? getBestSubmissionTimeComponent(result.bestSubmissionTimeSeconds) : null}
        </div>
      )
    } else {
      return (
        <div className="text-center">
          {isAccepted ? getPointsComponent(result.points, "CF") : null}
          {isAccepted ? getBestSubmissionTimeComponent(result.bestSubmissionTimeSeconds) : null}
          {isAccepted ? null : getRejectedAttemptComponent(result.rejectedAttemptCount, isAccepted)}
        </div>
      )
    }
  }
}

function getPointsComponent(points, type) {
  if (type === "IOI") {
    const styleClass = `font-bold ${points === 100 ? "text-green-600" : ""}`
    return <p className={styleClass}>{points}</p>
  } else if (type === "CF") {
    return <p className="font-bold text-green-600">{points}</p>
  } else {
    return null
  }
}

function getRejectedAttemptComponent(rejectedAttemptCount, isAccepted) {
  let rejectedAttemptText
  if (isAccepted) {
    rejectedAttemptText = `+${rejectedAttemptCount === 0 ? "" : rejectedAttemptCount}`
  } else {
    rejectedAttemptText = `-${rejectedAttemptCount}`
  }

  const rejectedAttemptComponentClass = `font-bold ${isAccepted ? "text-green-600" : "text-red-600"}`

  return <p className={rejectedAttemptComponentClass}>{rejectedAttemptText}</p>
}

function getBestSubmissionTimeComponent(bestSubmissionTimeSeconds) {
  const bestSubmissionTimeText = formatSeconds(bestSubmissionTimeSeconds)
  return <p>{bestSubmissionTimeText}</p>
}
