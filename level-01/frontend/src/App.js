import React from 'react'

import Header from './components/Header'

function App() {
  return (
    <>
      <Header title="Homepage">
        <ul>
          <li>Home</li>
          <li>Dashboard</li>
        </ul>
      </Header>
      <Header title="Projects">
        <ul>
          <li>SignIn</li>
        </ul>
      </Header>
    </>
  )
}

export default App