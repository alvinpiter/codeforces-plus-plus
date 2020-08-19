import React, { useState, useEffect } from 'react'
import ProblemFilterForm from './ProblemFilterForm'
import ProblemTable from './ProblemTable'
import { PROBLEM_TAGS } from '../constants/problemTags'
import { filterProblems } from '../features/filterProblems'

/*
Expected props:
* allProblems
* notAttemptedProblems
* attemptedProblems
* solvedProblems
*/
export default function ProblemTableWithFilterForm(props) {
  const { allProblems, notAttemptedProblems, attemptedProblems, solvedProblems } = props

  let [problems, setProblems] = useState([])
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
    setProblems(allProblems)
  }, [allProblems, notAttemptedProblems, attemptedProblems, solvedProblems])

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

    switch (problemDomain) {
      case 'ALL':
        setProblems(filterProblems(allProblems, filterParameters))
        break
      case 'NOT_ATTEMPTED':
        setProblems(filterProblems(notAttemptedProblems, filterParameters))
        break
      case 'ATTEMPTED':
        setProblems(filterProblems(attemptedProblems, filterParameters))
        break
      case 'SOLVED':
        setProblems(filterProblems(solvedProblems, filterParameters))
        break
    }
  }

  return (
    <div className="flex">
      <div className="w-1/2">
        <ProblemTable rows={problems} />
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
