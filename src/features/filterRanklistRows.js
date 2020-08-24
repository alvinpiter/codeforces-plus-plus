
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
    if (row.hasOwnProperty('userInfos')) {
      for (let userInfo of row.userInfos) {
        if (countryCodesSet.has(userInfo.countryCode))
          return true
      }

      return false
    } else
      return false
  })
}
