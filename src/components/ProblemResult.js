import React from 'react'
import { formatSeconds } from '../utils/timeFormatter'

export default function ProblemResult(props) {
  const {
    result,
    stacked
  } = props

  const isAccepted = (result.hasOwnProperty('bestSubmissionTimeSeconds'))
  const rejectedAttemptCount = result.rejectedAttemptCount

  if (!isAccepted && rejectedAttemptCount === 0)
    return null

  const rejectedAttemptComponentClass = isAccepted ? "text-green-600" : "text-red-600"
  const rejectedAttemptText = getRejectedAttemptText(rejectedAttemptCount, isAccepted)
  const rejectedAttemptComponent =
    stacked ?
    <p className={rejectedAttemptComponentClass}>{rejectedAttemptText}</p> :
    <span className={rejectedAttemptComponentClass}>{rejectedAttemptText}</span>

  if (!isAccepted) {
    return (
      <div className="text-center">
        {rejectedAttemptComponent}
      </div>
    )
  }

  const bestSubmissionTimeText = formatSeconds(result.bestSubmissionTimeSeconds)
  const bestSubmissionTimeComponent =
    stacked ?
    <p>{bestSubmissionTimeText}</p> :
    <span>{bestSubmissionTimeText}</span>

  if (stacked) {
    return (
      <div className="text-center">
        {rejectedAttemptComponent}
        {bestSubmissionTimeComponent}
      </div>
    )
  } else {
    return (
      <div className="text-center">
        {bestSubmissionTimeComponent} ({rejectedAttemptComponent})
      </div>
    )
  }
}

function getRejectedAttemptText(count, isAccepted) {
  if (isAccepted) {
    return `+${count === 0 ? "" : count}`
  } else {
    return `-${count}`
  }
}
