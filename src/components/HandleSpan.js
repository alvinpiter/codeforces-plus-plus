import React from 'react'
import { ratedFormat } from '../utils/rating'
import { getProfileURL } from '../utils/url'
import Link from '@material-ui/core/Link'

export default function HandleSpan(props) {
  const { userInfo } = props

  const handle = userInfo.handle
  const rating = userInfo.rating || 0

  const link =
  <Link href={getProfileURL(handle)} target="_blank">
    {ratedFormat(handle, rating)}
  </Link>

  return (
    <span> {link} </span>
  )
}
