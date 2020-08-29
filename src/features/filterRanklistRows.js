
/*
Supported filterParameters:
{
  countryCodes: ["ID", "JP"]
}
*/
export function filterRanklistRows(rows, filterParameters) {
  if (filterParameters.hasOwnProperty('handles'))
    rows = filterRanklistRowsByHandles(rows, filterParameters.handles)

  if (filterParameters.hasOwnProperty('countryCodes'))
    rows = filterRanklistRowsByCountryCodes(rows, filterParameters.countryCodes)

  return rows
}

function filterRanklistRowsByHandles(rows, handles) {
  let handlesSet = new Set()
  for (let handle of handles)
    handlesSet.add(handle)

  return rows.filter(row => {
    if (row.hasOwnProperty('userInfos')) {
      for (let userInfo of row.userInfos) {
        if (handlesSet.has(userInfo.handle))
          return true
      }

      return false
    } else
      return false
  })
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
