import React, { useState, useEffect } from 'react'
import StandingFilter from './StandingFilter'
import StandingTable from './StandingTable'
import { filterRanklistRows } from '../features/filterRanklistRows'

export default function StandingTableWithFilter(props) {
  const { standings } = props
  const {
    contestType,
    problems,
    problemStatistics,
    rows,
    countries
  } = standings

  const [selectedCountryCodes, setSelectedCountryCodes] = useState([])
  const [filteredRows, setFilteredRows] = useState([])

  useEffect(() => {
    setFilteredRows(rows)
  }, [rows])

  const onCountriesChange = (event, value) => {
    setSelectedCountryCodes(value.map(v => v.code))
  }

  const onApplyFilter = () => {
    const filterParameters = {}
    if (selectedCountryCodes.length > 0)
      filterParameters.countryCodes = selectedCountryCodes

    setFilteredRows(filterRanklistRows(rows, filterParameters))
  }

  return (
    <div>
      <StandingFilter
        countries={countries}
        onCountriesChange={onCountriesChange}
        onApplyFilter={onApplyFilter}
      />
      <StandingTable
        contestType={contestType}
        problems={problems}
        problemStatistics={problemStatistics}
        rows={filteredRows}
      />
    </div>
  )
}
