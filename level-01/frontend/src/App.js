import React, { useState, useEffect } from 'react'

import api from './services/api'

import './App.css'

import Header from './components/Header'

function App() {
  const [projects, setProjects] = useState([])

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `New Project ${Date.now()}`,
      owner: 'Vinicius Peres'
    })

    const project = response.data

    setProjects([...projects, project])
  }

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  return (
    <>
      <Header title="Homepage" />

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  )
}

export default App