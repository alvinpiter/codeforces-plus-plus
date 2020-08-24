import { overwrite, getCode } from 'country-list'

export function getCountryCode(countryName) {
  return getCode(countryName)
}
