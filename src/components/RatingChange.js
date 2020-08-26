import React from 'react'
import { ratedFormat } from '../utils/rating'

export default function RatingChange(props) {
  const { ratingChange } = props

  if (ratingChange === undefined)
    return null

  const { oldRating, newRating } = ratingChange
  const diff = newRating - oldRating

  const oldRatingComponent = ratedFormat(oldRating, oldRating)
  const newRatingComponent = ratedFormat(newRating, newRating)

  const diffComponentStyle = `font-bold ${diff >= 0 ? "text-green-500" : "text-red-500"}`
  const diffComponent = <span className={diffComponentStyle}>{diff < 0 ? "" : "+"}{diff}</span>

  return <span>{oldRatingComponent} ({diffComponent}) {newRatingComponent}</span>
}