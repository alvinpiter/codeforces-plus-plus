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

*/
export function filterProblems(problems, filterParameters) {
  const filterFunction = buildFilterFunction(filterParameters)
  return problems.filter(filterFunction)
}

function buildFilterFunction(filterParameters) {
  return (problem) => {
    let ok = true;

    if (filterParameters.hasOwnProperty('rating')) {
      ok = ok && filterByRating(problem, filterParameters.rating)
    }

    if (filterParameters.hasOwnProperty('contestID')) {
      ok = ok && filterByContestID(problem, filterParameters.contestID)
    }

    if (filterParameters.hasOwnProperty('tags')) {
      ok = ok && filterByTags(problem, filterParameters.tags)
    }

    return ok
  }
}

function filterByRating(problem, ratingFilter) {
  const minRating = ratingFilter.minimum
  const maxRating = ratingFilter.maximum

  return (problem.rating >= minRating && problem.rating <= maxRating)
}

function filterByContestID(problem, contestIDFilter) {
  const minContestID = contestIDFilter.minimum
  const maxContestID = contestIDFilter.maximum

  return (problem.contestID >= minContestID && problem.contestID <= maxContestID)
}

function filterByTags(problem, tagsFilter) {
  if (tagsFilter.mode === "AND") {
    return filterByTagsWithAND(problem, tagsFilter.tags)
  } else {
    return filterByTagsWithOR(problem, tagsFilter.tags)
  }
}

function filterByTagsWithAND(problem, tags) {
  let problemTagsSet = new Set(problem.tags)
  for (let tag of tags) {
    if (!problemTagsSet.has(tag))
      return false
  }

  return true
}

function filterByTagsWithOR(problem, tags) {
  let tagsSet = new Set(tags)
  for (let tag of problem.tags) {
    if (tagsSet.has(tag))
      return true
  }

  return false
}
