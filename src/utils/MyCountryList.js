import { overwrite, getCode } from 'country-list'

export function getCountryCode(countryName) {
  const nameCodePairs = [
    ["United States", "US"],
    ["Taiwan", "TW"],
    ["South Korea", "KR"],
    ["Vietnam", "VN"],
    ["Russia", "RU"],
    ["Iran", "IR"],
    ["United Kingdom", "GB"],
    ["Moldova", "MD"],
    ["Syria", "SY"],
    ["Macedonia", "MK"],
    ["Bolivia", "BO"],
    ["Palestinian Territory", "PS"],
    ["North Korea", "KP"],
    ["Serbia and Montenegro", "RS"]
  ]

  const nameCodeObjects = nameCodePairs.map(pair => {
    return { name: pair[0], code: pair[1] }
  })

  overwrite(nameCodeObjects)

  return getCode(countryName)
}
