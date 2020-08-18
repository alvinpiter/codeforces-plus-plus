
/*
Supported filterParameters:
{
  countries: ["Indonesia", "Japan"]
}
*/
export function filterRanklistRows(rows, filterParameters) {
  if (filterParameters.hasOwnProperty('countries'))
    rows = filterRanklistRowsByCountries(rows, filterParameters.countries)

  return rows
}

function filterRanklistRowsByCountries(rows, countries) {
  let countriesSet = new Set()
  for (let country of countries)
    countriesSet.add(country)

  return rows.filter(row => {
    if (row.hasOwnProperty('userInfo') && row.userInfo.hasOwnProperty('country') && countriesSet.has(row.userInfo.country))
      return true
    else
      return false
  })
}
