import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function StandingFilter(props) {
  const { countries, users, onCountriesChange, onUsersChange, onApplyFilter } = props

  return (
    <div className="space-y-4">
      <Autocomplete
        multiple
        options={users}
        getOptionLabel={opt => opt.name === "" ? opt.handle : `${opt.handle} (${opt.name})`}
        renderInput={params =>
          <TextField
            {...params}
            variant="standard"
            placeholder="Handles or names"
          />
        }
        onChange={onUsersChange}
      />
      <Autocomplete
        multiple
        options={countries}
        getOptionLabel={opt => opt.name}
        renderInput={params =>
          <TextField
            {...params}
            variant="standard"
            placeholder="Countries"
          />
        }
        onChange={onCountriesChange}
      />
      <div className="flex justify-end">
        <Button variant="contained" color="primary" onClick={onApplyFilter}> Apply filter </Button>
      </div>
    </div>
  )
}
