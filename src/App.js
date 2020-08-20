import React from 'react'
import { getProblemsetProblems } from './features/getProblemsetProblems'
import { getNormalizedSubmissions } from './features/getNormalizedSubmissions'
import { filterNormalizedSubmissions } from './features/filterNormalizedSubmissions'

function App() {
  let problemsPromise = getProblemsetProblems()

  problemsPromise.then(problems => {
    let submissionsPromise = getNormalizedSubmissions("alvinpiter", problems)
    submissionsPromise.then(subs => {
      const filteredSubs = filterNormalizedSubmissions(subs)
      console.log(filteredSubs)

      for (let x of filteredSubs.solvedProblemIDs) {
        if (x.id === "578B")
          console.log(x.submittedID)
      }
    })
  })

  return (
    <div>
    </div>
  );
}

export default App;
