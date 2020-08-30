
/*
Supported filterParameters:
{
  handles: ["alvinpiter", "tourist"],
  countryCodes: ["ID", "JP"]
}
*/
export function filterRanklistRows(rows, filterParameters) {
  let handlesSet = new Set()
  if (filterParameters.hasOwnProperty('handles')) {
    for (let handle of filterParameters.handles)
      handlesSet.add(handle)
  }

  let countryCodesSet = new Set()
  if (filterParameters.hasOwnProperty('countryCodes')) {
    for (let code of filterParameters.countryCodes)
      countryCodesSet.add(code)
  }

  return rows.filter(row => {
    if (row.hasOwnProperty('userInfos')) {
      for (let userInfo of row.userInfos) {
        if (handlesSet.has(userInfo.handle))
          return true

        if (countryCodesSet.has(userInfo.countryCode))
          return true
      }

      return false
    } else
      return false
  })
}
