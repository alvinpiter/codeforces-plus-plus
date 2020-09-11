
/*
Supported filterParameters:
{
  handles: ["alvinpiter", "tourist"],
  countryCodes: ["ID", "JP"]
}
*/
export default function filterRanklistRows(rows, filterParameters) {
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
        const byHandle = (handlesSet.size > 0 ? handlesSet.has(userInfo.handle) : true)
        const byCountryCode = (countryCodesSet.size > 0 ? countryCodesSet.has(userInfo.countryCode) : true)

        if (byHandle || byCountryCode)
          return true
      }

      return false
    } else
      return false
  })
}
