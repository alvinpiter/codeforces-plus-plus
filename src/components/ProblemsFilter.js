import React, { useState } from 'react'

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
  let [tagsState, setTagsState] = useState(getInitialTagsState())

  const onTagToggle = (tag) => {
    setTagsState({
      ...tagsState,
      [tag]: !tagsState[tag]
    })
  }

  const tagsComponent = tags.map(tag =>
    <button
      class={tagsState[tag] ? selectedTagStyle : regularTagStyle}
      onClick={() => onTagToggle(tag)}
    > {tag} </button>
  )

  return (
    <div>
      <div class="flex flex-wrap">
        {tagsComponent}
      </div>
    </div>
  )
}
