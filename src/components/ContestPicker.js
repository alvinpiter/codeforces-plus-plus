import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'

export default function ContestPicker(props) {
  const { contests, onPicked } = props
  const [pickedContest, setPickedContest] = useState(null)

  const onAutocompleteChange = (event, obj) => {
    if (obj !== null)
      setPickedContest(obj)
  }

  const onClick = () => {
    if (pickedContest === null)
      return
    else
      onPicked(pickedContest)
  }

  return (
    <div className="flex space-x-2">
      <Autocomplete
        options={contests}
        getOptionLabel={contest => contest.name}
        style={{ width: 500 }}
        renderInput={(params) => <TextField {...params} variant="outlined" /> }
        onChange={onAutocompleteChange}
      />
      <Button variant="contained" color="primary" onClick={onClick}>Submit</Button>
    </div>
  )
}
