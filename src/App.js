import React from 'react'
import ProblemsPage from './components/ProblemsPage'
import { compare } from './features/compare'

function App() {
  let temp = compare('alvinpiter', 'jauhar.wibisono')
  temp.then(res => console.log(res))

  return (
    <div>
      <ProblemsPage />
    </div>
  );
}

export default App;
