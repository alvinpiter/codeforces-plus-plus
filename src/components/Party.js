import React from 'react'
import { ratedFormat } from '../utils/rating'
import { constructFullName } from '../utils/constructFullName'
import ReactCountryFlag from 'react-country-flag'
import Link from '@material-ui/core/Link'
import Tooltip from '@material-ui/core/Tooltip'

export default function Party(props) {
  const {
    party,
    userInfos,
    ratingChange
  } = props

  let teamNameComponent = null
  if (party.teamId !== undefined) {
    teamNameComponent =
      <p>
        <Link href={`https://codeforces.com/team/${party.teamId}`}>
          {party.teamName}:
        </Link>
      </p>
  }

  let membersComponent = party.members.map((member, index) => {
    const handle = member.handle
    const name = constructFullName(userInfos[index].firstName, userInfos[index].lastName)
    const country = userInfos[index].country
    const countryCode = userInfos[index].countryCode

    let rating
    if (ratingChange)
      rating = ratingChange.oldRating
    else if (userInfos[index].rating)
      rating = userInfos[index].rating
    else
      rating = 0

    const flagComponent = <CountryFlag country={country} countryCode={countryCode} />

    const handleComponent =
      <Link href={`https://codeforces.com/profile/${handle}`} >
        {ratedFormat(handle, rating)}
      </Link>

    const nameComponent = (name === "" ? null : `(${name})`)

    return <p key={handle}>{flagComponent} {handleComponent} {nameComponent}</p>
  })

  return (
    <div>
      {teamNameComponent}
      {membersComponent}
    </div>
  )
}

function CountryFlag(props) {
  const { country, countryCode } = props
  if (countryCode === undefined)
    return null
  else
    return (
      <Tooltip title={country}>
        <span><ReactCountryFlag countryCode={countryCode} /></span>
      </Tooltip>
    )
}
