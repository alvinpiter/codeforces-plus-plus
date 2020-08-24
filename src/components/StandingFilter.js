import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function StandingFilter(props) {
  const { countries, onCountriesChange, onApplyFilter } = props

  return (
    <div>
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
      <Button variant="contained" color="primary" onClick={onApplyFilter}>Submit</Button>
    </div>
  )
}
