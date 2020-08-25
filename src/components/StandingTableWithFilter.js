import React, { useState, useEffect } from 'react'
import StandingFilter from './StandingFilter'
import StandingTable from './StandingTable'
import { filterRanklistRows } from '../features/filterRanklistRows'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function StandingTableWithFilter(props) {
  const { officialStandings, unofficialStandings } = props

  const { contestType, problems } = officialStandings

  const officialRows = officialStandings.rows
  const officialCountries = officialStandings.countries

  const unofficialRows = unofficialStandings.rows
  const unofficialCountries = unofficialStandings.countries

  const problemStatistics = officialStandings.problemStatistics //This is wrong. Will get back to it later

  const [selectedCountryCodes, setSelectedCountryCodes] = useState([])
  const [filteredRows, setFilteredRows] = useState([])
  const [showUnofficial, setShowUnofficial] = useState(false)

  useEffect(() => {
    setFilteredRows(officialRows)
  }, [officialRows, unofficialRows])

  const onCountriesChange = (event, value) => {
    setSelectedCountryCodes(value.map(v => v.code))
  }

  const onShowUnofficialToggle = () => {
    if (showUnofficial === true) {
      setShowUnofficial(false)
      setFilteredRows(officialRows)
    } else {
      setShowUnofficial(true)
      setFilteredRows(unofficialRows)
    }
  }

  const onApplyFilter = () => {
    const filterParameters = {}
    if (selectedCountryCodes.length > 0)
      filterParameters.countryCodes = selectedCountryCodes

    if (showUnofficial)
      setFilteredRows(filterRanklistRows(unofficialRows, filterParameters))
    else
      setFilteredRows(filterRanklistRows(officialRows, filterParameters))
  }

  return (
    <div>
      <StandingFilter
        countries={showUnofficial ? unofficialCountries : officialCountries}
        onCountriesChange={onCountriesChange}
        onApplyFilter={onApplyFilter}
      />

      <div className="flex justify-end">
        <FormControlLabel
          control={<Switch checked={showUnofficial} onChange={onShowUnofficialToggle} color="primary"/>}
          label="Show unofficial"
        />
      </div>

      <StandingTable
        contestType={contestType}
        problems={problems}
        problemStatistics={problemStatistics}
        rows={filteredRows}
      />
    </div>
  )
}
