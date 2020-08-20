import React from 'react'
import { getProblemsetProblems } from './features/getProblemsetProblems'

function App() {
  let problemsPromise = getProblemsetProblems()
  problemsPromise.then(problems => console.log(problems)).catch(e => console.log(e))

  return (
    <div>
    </div>
  );
}

export default App;
