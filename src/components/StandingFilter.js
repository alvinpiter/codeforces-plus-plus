import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

export default function StandingFilter(props) {
  const { countries, onCountriesChange } = props

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
    </div>
  )
}