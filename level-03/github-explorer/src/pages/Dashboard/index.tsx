import React, { useCallback, useState, FormEvent, useEffect } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import { Title, Form, Error, Repositories } from './styles'

interface IRepository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('')
  const [inputError, setInputError] = useState('')
  const [repositories, setRepositories] = useState<IRepository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories'
    )

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories)
    } else {
      return []
    }
  })

  const handleAddRepository = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!newRepo) {
        setInputError('Digite o autor/nome do repositório')
        return
      }

      try {
        const response = await api.get<IRepository>(`repos/${newRepo}`)

        const repository = response.data

        setRepositories([...repositories, repository])
        setNewRepo('')
        setInputError('')
      } catch (err) {
        setInputError('Erro na busca por esse repositório')
      }
    },
    [newRepo, repositories]
  )

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories)
    )
  }, [repositories])

  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  )
}

export default Dashboard
