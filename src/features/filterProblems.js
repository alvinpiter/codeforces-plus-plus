/*
Given an array of problems, filter out problems which fulfills
all the filterParameters. Supported filterParameters are:
* filter by rating. Format:
rating: {
  minimum: 1000,
  maximum: 2000
}

* filter by contest ID. Format:
contestID: {
  minimum: 500,
  maximum: 750
}

* filter by tags. Format:
tags: {
  mode: "AND"/"OR",
  tags: ["implementation", "greedy"]
}

* filter by id. Format:
ids: {
  mode: "EXCLUDE"/"INCLUDE",
  ids: ["1A", "2B"]
}
*/
export function filterProblems(problems, filterParameters) {
  const keyToFilterFunctionMap = {
    'rating': filterByRating,
    'contestID': filterByContestID,
    'tags': filterByTags,
    'ids': filterByIDs
  }

  for (let entry of Object.entries(keyToFilterFunctionMap)) {
    const key = entry[0]
    const filterFunction = entry[1]

    if (filterParameters.hasOwnProperty(key))
      problems = filterFunction(problems, filterParameters[key])
  }

  return problems
}

function filterByRating(problems, ratingFilter) {
  const minRating = ratingFilter.minimum
  const maxRating = ratingFilter.maximum

  return problems.filter(problem =>
    problem.rating >= minRating && problem.rating <= maxRating
  )
}

function filterByContestID(problems, contestIDFilter) {
  const minContestID = contestIDFilter.minimum
  const maxContestID = contestIDFilter.maximum

  return problems.filter(problem =>
    problem.contestID >= minContestID && problem.contestID <= maxContestID
  )
}

function filterByTags(problems, tagsFilter) {
  if (tagsFilter.mode === "AND") {
    return filterByTagsWithAnd(problems, tagsFilter.tags)
  } else {
    return filterByTagsWithOr(problems, tagsFilter.tags)
  }
}

function filterByTagsWithAnd(problems, tags) {
  return problems.filter(problem => {
    const problemTagsSet = new Set(problem.tags)
    for (let tag of tags) {
      if (!problemTagsSet.has(tag))
        return false
    }

    return true
  })
}

function filterByTagsWithOr(problems, tags) {
  let tagsSet = new Set(tags)
  return problems.filter(problem => {
    for (let tag of problem.tags) {
      if (tagsSet.has(tag))
        return true
    }

    return false
  })
}

function filterByIDs(problems, idsFilter) {
  if (idsFilter.mode === "EXCLUDE") {
    return filterByIDsWithExclude(problems, idsFilter.ids)
  } else {
    return filterByIDsWithInclude(problems, idsFilter.ids)
  }
}

function filterByIDsWithExclude(problems, ids) {
  let idsSet = new Set(ids)
  return problems.filter(problem => !idsSet.has(problem.id))
}

function filterByIDsWithInclude(problems, ids) {
  let idsSet = new Set(ids)
  return problems.filter(problem => idsSet.has(problem.id))
}
