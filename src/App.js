import React from 'react'
import { getProblemsetProblems } from './features/getProblemsetProblems'
import { getNormalizedSubmissions } from './features/getNormalizedSubmissions'

function App() {
  let problemsPromise = getProblemsetProblems()

  problemsPromise.then(problems => {
    let submissionsPromise = getNormalizedSubmissions("alvinpiter", problems)
    submissionsPromise.then(subs => {
      console.log(subs)
    })
  })

  return (
    <div>
    </div>
  );
}

export default App;
