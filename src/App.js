import React from 'react'
import StandingFilter from './components/StandingFilter'

function App() {
  const countries = [
    {name: "Indonesia", code: "ID"},
    {name: "United Kindom", code: "GB"},
    {name: "Russia", code: "RU"},
    {name: "United States", code: "US"}
  ]

  const onCountriesChange = (event, value) => {
    console.log(value)
  }

  return (
    <div style={{width: 500}}>
      <StandingFilter
        countries={countries}
        onCountriesChange={onCountriesChange}
      />
    </div>
  );
}

export default App;
