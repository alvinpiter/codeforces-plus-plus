import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

const selectedTagStyle = "bg-green-500 focus:outline-none rounded-full p-2 m-1"
const regularTagStyle = "bg-gray-300 focus:outline-none rounded-full p-2 m-1"

export default function ProblemFilterForm(props) {
  const { problemDomain, minRating, maxRating, minContestID, maxContestID, tagsMode, tagsState } = props
  const { onProblemDomainChange, onMinRatingChange, onMaxRatingChange, onMinContestIDChange, onMaxContestIDChange } = props
  const { onTagsModeToggle, onTagsClear, onTagToggle } = props
  const { onApplyFilter } = props

  const tagsComponent = Object.keys(tagsState).map((tag, index) =>
    <button
      key={index}
      className={tagsState[tag] ? selectedTagStyle : regularTagStyle}
      onClick={() => onTagToggle(tag)}
    > {tag} </button>
  )

  return (
    <div>
      <div className="p-2 border-b-2 flex justify-center">
        <RadioGroup row value={problemDomain} onChange={onProblemDomainChange}>
          <FormControlLabel value="ALL" control={<Radio />} label="All"  />
          <FormControlLabel value="NOT_ATTEMPTED" control={<Radio />} label="Not attempted" />
          <FormControlLabel value="ATTEMPTED" control={<Radio />} label="Attempted" />
          <FormControlLabel value="SOLVED" control={<Radio />} label="Solved" />
        </RadioGroup>
      </div>

      <div className="flex justify-center space-x-2 p-2 border-b-2">
        <TextField
          label="Minimum rating"
          value={minRating}
          onChange={event => onMinRatingChange(event.target.value)}
        />

        <TextField
          label="Maximum rating"
          value={maxRating}
          onChange={event => onMaxRatingChange(event.target.value)}
        />
      </div>

      <div className="flex justify-center space-x-2 p-2 border-b-2">
        <TextField
          label="Minimum contest ID"
          value={minContestID}
          onChange={event => onMinContestIDChange(event.target.value)}
        />

        <TextField
          label="Maximum contest ID"
          value={maxContestID}
          onChange={event => onMaxContestIDChange(event.target.value)}
        />
      </div>

      <div className="p-2 border-b-2">
        <div className="flex justify-center p-2">
          <FormControlLabel
            control={<Switch checked={tagsMode === "AND"} onChange={onTagsModeToggle} />}
            label={
              tagsMode === "OR" ?
              "Problem must have at least 1 selected tag(s)" :
              "Problem must have all selected tag(s)"
            }
          />
          <Button variant="contained" color="secondary" onClick={onTagsClear}> Clear tags </Button>
        </div>
        <div className="flex flex-wrap">
          {tagsComponent}
        </div>
      </div>

      <div className="p-2 flex justify-center">
        <Button variant="contained" color="primary" onClick={onApplyFilter}> Apply filter </Button>
      </div>
    </div>
  )
}
