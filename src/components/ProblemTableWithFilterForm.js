import React, { useState, useEffect } from 'react'
import ProblemFilterForm from './ProblemFilterForm'
import ProblemTable from './ProblemTable'
import { PROBLEM_TAGS } from '../constants/problemTags'
import { filterProblems } from '../features/filterProblems'

/*
Expected props:
* problems (array of Problem with submittedID and state). There are three possible state: -1 (attempted), 0 (not attempted), 1 (solved)
*/
export default function ProblemTableWithFilterForm(props) {
  const { problems } = props

  let [filteredProblems, setFilteredProblems] = useState([])
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

  useEffect(() => {
    setFilteredProblems(problems)
  }, [problems])

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
    const filterParameters = {
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
      }
    }

    let tempProblems
    switch (problemDomain) {
      case 'ALL':
        tempProblems = problems.slice()
        break
      case 'NOT_ATTEMPTED':
        tempProblems = problems.filter(p => p.state === 0)
        break
      case 'ATTEMPTED':
        tempProblems = problems.filter(p => p.state === -1)
        break
      default:
        tempProblems = problems.filter(p => p.state === 1)
    }

    setFilteredProblems(filterProblems(tempProblems, filterParameters))
  }

  return (
    <div className="flex">
      <div className="w-1/2">
        <ProblemTable rows={filteredProblems} />
      </div>

      <div className="w-1/2">
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
    </div>
  )
}

function getInitialTagsState() {
  let tagsState = {}
  for (let tag of PROBLEM_TAGS)
    tagsState[tag] = false

  return tagsState
}
