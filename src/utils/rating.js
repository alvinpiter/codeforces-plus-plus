import React from 'react'

export function ratedFormat(text, rating) {
  if (rating < 3000) {
    const styleClass = `font-bold ${getColorClass(rating)}`
    return <span className={styleClass}>{text}</span>
  } else
    return ratedLGMFormat(text)
}

function ratedLGMFormat(text) {
  text = String(text)
  return (
    <span className="font-bold">
      {text[0]}<span className={getColorClass(2400)}>{text.substring(1)}</span>
    </span>
  )
}

function getColorClass(rating) {
  if (rating === 0)
    return ""
  else if (rating < 1200)
    return "text-gray-500"
  else if (rating < 1400)
    return "text-green-500"
  else if (rating < 1600)
    return "text-teal-500"
  else if (rating < 1900)
    return "text-blue-500"
  else if (rating < 2100)
    return "text-purple-500"
  else if (rating < 2400)
    return "text-orange-500"
  else if (rating < 3000)
    return "text-red-500"
}
