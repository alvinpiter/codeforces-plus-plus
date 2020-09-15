import React from 'react'

export default function DisplayIfNotError(props) {
  const { error } = props

  if (error)
    return null
  else {
    return (
      <div>
        {props.children}
      </div>
    )
  }
}
