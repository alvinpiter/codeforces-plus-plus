import React from 'react'

export default function Hacks(props) {
  const {
    successfulCount,
    unsuccessfulCount
  } = props

  const successfulCountComponent = <span className="font-bold text-green-600">+{successfulCount}</span>
  const unsuccessfulCountComponent = <span className="font-bold text-red-600">-{unsuccessfulCount}</span>

  let cell
  if (successfulCount === 0 && unsuccessfulCount === 0)
    cell = null
  else if (successfulCount > 0 && unsuccessfulCount > 0)
    cell = <p>{successfulCountComponent}:{unsuccessfulCountComponent}</p>
  else if (successfulCount > 0)
    cell = <p>{successfulCountComponent}</p>
  else
    cell = <p>{unsuccessfulCountComponent}</p>

  return cell
}
