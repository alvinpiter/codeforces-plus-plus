import React, { useState, useEffect } from 'react'
import filterRanklistRows from '../features/filterRanklistRows'
import StandingFilter from './StandingFilter'
import StandingTable from './StandingTable'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function StandingTableWithFilter(props) {
  const { standings } = props

  const { contest, problems } = standings

  const contestType = contest.type

  const {
    officialRows,
    officialUsers,
    officialCountries,
    unofficialRows,
    unofficialUsers,
    unofficialCountries
  } = standings

  const [selectedCountryCodes, setSelectedCountryCodes] = useState([])
  const [selectedHandles, setSelectedHandles] = useState([])
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

  const onUsersChange = (event, value) => {
    setSelectedHandles(value.map(v => v.handle))
  }

  const doApplyFilter = (rows) => {
    const filterParameters = {
      handles: selectedHandles,
      countryCodes: selectedCountryCodes
    }

    setFilteredRows(filterRanklistRows(rows, filterParameters))
  }

  const onShowUnofficialToggle = () => {
    if (showUnofficial === true) {
      setShowUnofficial(false)
      doApplyFilter(officialRows)
    } else {
      setShowUnofficial(true)
      doApplyFilter(unofficialRows)
    }
  }

  const onApplyFilter = () => {
    setPage(0)

    if (showUnofficial)
      doApplyFilter(unofficialRows)
    else
      doApplyFilter(officialRows)
  }

  return (
    <div>
      <div className="w-1/3 m-2">
        <StandingFilter
          countries={showUnofficial ? unofficialCountries : officialCountries}
          users={showUnofficial ? unofficialUsers : officialUsers}
          onCountriesChange={onCountriesChange}
          onUsersChange={onUsersChange}
          onApplyFilter={onApplyFilter}
        />
      </div>

      <div className="flex justify-end hidden">
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
