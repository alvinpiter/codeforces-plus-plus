
/*
Supported filterParameters:
{
  countryCodes: ["ID", "JP"]
}
*/
export function filterRanklistRows(rows, filterParameters) {
  if (filterParameters.hasOwnProperty('countryCodes'))
    rows = filterRanklistRowsByCountryCodes(rows, filterParameters.countryCodes)

  return rows
}

function filterRanklistRowsByCountryCodes(rows, countryCodes) {
  let countryCodesSet = new Set()
  for (let code of countryCodes)
    countryCodesSet.add(code)

  return rows.filter(row => {
    if (row.hasOwnProperty('userInfo') && row.userInfo.hasOwnProperty('countryCode') && countryCodesSet.has(row.userInfo.countryCode))
      return true
    else
      return false
  })
}
