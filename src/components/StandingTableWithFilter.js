import React, { useState, useEffect } from 'react'
import StandingFilter from './StandingFilter'
import StandingTable from './StandingTable'
import { filterRanklistRows } from '../features/filterRanklistRows'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function StandingTableWithFilter(props) {
  const { standings } = props

  const { contest, problems } = standings

  const contestType = contest.type

  const {
    officialRows,
    officialCountries,
    unofficialRows,
    unofficialCountries
  } = standings

  const [selectedCountryCodes, setSelectedCountryCodes] = useState([])
  const [filteredRows, setFilteredRows] = useState([])
  const [showUnofficial, setShowUnofficial] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

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
    setPage(0)

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
        rows={filteredRows}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}
