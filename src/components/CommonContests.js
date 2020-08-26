import React from 'react'

export default function CommonContests(props) {
  const { firstHandle, secondHandle, commonContests } = props

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
    </div>
  )
}
