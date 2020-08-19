import React, { useState } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'

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

export default function ProblemsFilter() {
  let [tagsMode, setTagsMode] = useState("AND")
  let [tagsState, setTagsState] = useState(getInitialTagsState())

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

  const tagsComponent = tags.map(tag =>
    <button
      class={tagsState[tag] ? selectedTagStyle : regularTagStyle}
      onClick={() => onTagToggle(tag)}
    > {tag} </button>
  )

  return (
    <div>
      <div class="flex justify-center">
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
      <div class="flex flex-wrap">
        {tagsComponent}
      </div>
    </div>
  )
}
