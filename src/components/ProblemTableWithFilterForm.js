import React, { useState } from 'react'
import ProblemFilterForm from './ProblemFilterForm'
import ProblemTable from './ProblemTable'
import { PROBLEM_TAGS } from '../constants/problemTags'

/*
Expected props:
* allProblems
* notAttemptedProblems
* attemptedProblems
* solvedProblems
*/
export default function ProblemTableWithFilterForm() {
  let [problemDomain, setProblemDomain] = useState("ALL")
  let [minRating, setMinRating] = useState(0)
  let [maxRating, setMaxRating] = useState(9999)
  let [minContestID, setMinContestID] = useState(0)
  let [maxContestID, setMaxContestID] = useState(9999)
  let [tagsMode, setTagsMode] = useState("AND")
  let [tagsState, setTagsState] = useState(getInitialTagsState())

  const onMinRatingChange = (value) => setMinRating(value)
  const onMaxRatingChange = (value) => setMaxRating(value)
  const onMinContestIDChange = (value) => setMinContestID(value)
  const onMaxContestIDChange = (value) => setMaxContestID(value)

  const onTagsModeToggle = () => {
    setTagsMode(tagsMode === "OR" ? "AND" : "OR")
  }

  const onTagToggle = (tag) => {
    setTagsState({
      ...tagsState,
      [tag]: !tagsState[tag]
    })
  }

  const onTagsClear = () => {
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
        minimum: minContestID,
        maximum: maxContestID
      },
      tags: {
        mode: tagsMode,
        tags: PROBLEM_TAGS.filter(tag => tagsState[tag])
      },
      problemDoman: problemDomain
    }

    console.log(filter)
  }

  return (
    <div className="flex">
      <ProblemFilterForm
        problemDomain={problemDomain}
        minRating={minRating}
        maxRating={maxRating}
        minContestID={minContestID}
        maxContestID={maxContestID}
        tagsMode={tagsMode}
        tagsState={tagsState}

        onProblemDomainChange={onProblemDomainChange}
        onMinRatingChange={onMinRatingChange}
        onMaxRatingChange={onMaxRatingChange}
        onMinContestIDChange={onMinContestIDChange}
        onMaxContestIDChange={onMaxContestIDChange}
        onTagsModeToggle={onTagsModeToggle}
        onTagsClear={onTagsClear}
        onTagToggle={onTagToggle}
        onApplyFilter={onApplyFilter}
      />
    </div>
  )
}

function getInitialTagsState() {
  let tagsState = {}
  for (let tag of PROBLEM_TAGS)
    tagsState[tag] = false

  return tagsState
}
