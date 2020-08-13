/*
Given an array of problems, filter out problems which fulfills
all the filterParameters. Supported filterParameters are:
* filter by rating. Format:
rating: {
  minimum: 1000,
  maximum: 2000
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

    return ok
  }
}

function filterByRating(problem, ratingFilter) {
  const minRating = ratingFilter.minimum
  const maxRating = ratingFilter.maximum

  return (problem.rating >= minRating && problem.rating <= maxRating)
}
