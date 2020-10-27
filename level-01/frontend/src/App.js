import React, { useState } from 'react'

import './App.css'
import treeImg from './assets/tree.jpg'

import Header from './components/Header'

function App() {
  const [projects, setProjects] = useState(['Deselvolvimento de app', 'Front-end web'])

  function handleAddProject() {
    setProjects([...projects, `Novo projeto ${Date.now()}`])
  }

  return (
    <>
      <Header title="Homepage" />

      <img src={treeImg} width={300} alt="Tree" />

      <ul>
        {projects.map(project => <li key={project}>{project}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  )
}

export default App