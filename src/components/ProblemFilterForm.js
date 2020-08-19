import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

const tags = [
  "constructive algorithms",
  "divide and conquer",
  "dfs and similar",
  "data structures",
  "binary search",
  "2-sat",
  "meet-in-the-middle",
  "schedules",
  "interactive",
  "implementation",
  "shortest paths",
  "fft",
  "games",
  "strings",
  "combinatorics",
  "bitmasks",
  "matrices",
  "number theory",
  "brute force",
  "dsu",
  "graph matchings",
  "*special",
  "geometry",
  "graphs",
  "trees",
  "two pointers",
  "dp",
  "probabilities",
  "hashing",
  "greedy",
  "string suffix structures",
  "expression parsing",
  "math",
  "sortings",
  "ternary search",
  "flows",
  "chinese remainder theorem"
]

const selectedTagStyle = "bg-green-500 focus:outline-none rounded-full p-2 m-1"
const regularTagStyle = "bg-gray-300 focus:outline-none rounded-full p-2 m-1"

function getInitialTagsState() {
  let state = {}
  for (let tag of tags)
    state[tag] = false

  return state
}

export default function ProblemFilterForm() {
  let [minRating, setMinRating] = useState(0)
  let [maxRating, setMaxRating] = useState(9999)
  let [minContestID, setMinContestID] = useState(0)
  let [maxContestID, setMaxContestID] = useState(9999)
  let [tagsMode, setTagsMode] = useState("AND")
  let [tagsState, setTagsState] = useState(getInitialTagsState())
  let [problemDomain, setProblemDomain] = useState("ALL")

  const onTagModeToggle = () => {
    setTagsMode(tagsMode === "OR" ? "AND" : "OR")
  }

  const onTagToggle = (tag) => {
    setTagsState({
      ...tagsState,
      [tag]: !tagsState[tag]
    })
  }

  const onTagClear = () => {
    setTagsState(getInitialTagsState())
  }

  const onProblemDomainChange = (event) => {
    setProblemDomain(event.target.value)
  }

  const onApplyFilter = () => {
    const filter = {
      rating: {
        minimum: minRating,
        maximum: maxRating
      },
      contestID: {
        minimum: minRating,
        maximum: maxRating
      },
      tags: {
        mode: tagsMode,
        tags: tags.filter(tag => tagsState[tag])
      },
      problemDoman: problemDomain
    }

    console.log(filter)
  }

  const tagsComponent = tags.map((tag, index) =>
    <button
      key={index}
      className={tagsState[tag] ? selectedTagStyle : regularTagStyle}
      onClick={() => onTagToggle(tag)}
    > {tag} </button>
  )

  return (
    <div>
      <div className="flex justify-center space-x-2 p-2 border-b-2">
        <TextField
          label="Minimum rating"
          value={minRating}
          onChange={event => setMinRating(event.target.value)}
        />

        <TextField
          label="Maximum rating"
          value={maxRating}
          onChange={event => setMaxRating(event.target.value)}
        />
      </div>

      <div className="flex justify-center space-x-2 p-2 border-b-2">
        <TextField
          label="Minimum contest ID"
          value={minContestID}
          onChange={event => setMinContestID(event.target.value)}
        />

        <TextField
          label="Maximum contest ID"
          value={maxContestID}
          onChange={event => setMaxContestID(event.target.value)}
        />
      </div>

      <div className="p-2 border-b-2">
        <div className="flex justify-center p-2">
          <FormControlLabel
            control={<Switch checked={tagsMode === "AND"} onChange={onTagModeToggle} />}
            label={
              tagsMode === "OR" ?
              "Problem must have at least 1 selected tag(s)" :
              "Problem must have all selected tag(s)"
            }
          />
          <Button variant="contained" color="secondary" onClick={onTagClear}> Clear tags </Button>
        </div>
        <div className="flex flex-wrap">
          {tagsComponent}
        </div>
      </div>

      <div className="p-2 border-b-2 flex justify-center">
        <RadioGroup row value={problemDomain} onChange={onProblemDomainChange}>
          <FormControlLabel value="ALL" control={<Radio />} label="All"  />
          <FormControlLabel value="NOT_ATTEMPTED" control={<Radio />} label="Not attempted" />
          <FormControlLabel value="ATTEMPTED" control={<Radio />} label="Attempted" />
          <FormControlLabel value="SOLVED" control={<Radio />} label="Solved" />
        </RadioGroup>
      </div>

      <div className="p-2 flex justify-center">
        <Button variant="contained" color="primary" onClick={onApplyFilter}> Apply filter </Button>
      </div>
    </div>
  )
}
