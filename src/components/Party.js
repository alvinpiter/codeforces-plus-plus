import React from 'react'
import { ratedFormat } from '../utils/rating'
import ReactCountryFlag from 'react-country-flag'
import Link from '@material-ui/core/Link'

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
    const countryCode = userInfos[index].countryCode
    const rating =
      (ratingChange && ratingChange.oldRating) ||
      userInfos[index].rating ||
      0

    // const flagComponent = <CountryFlag countryCode={countryCode} />
    const flagComponent = <ReactCountryFlag countryCode={countryCode} />

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

function constructFullName(firstName, lastName) {
  let name = ""
  if (firstName !== undefined)
    name = name + firstName

  if (lastName !== undefined)
    name = name + (name.length === 0 ? "" : " ") + lastName

  return name
}
