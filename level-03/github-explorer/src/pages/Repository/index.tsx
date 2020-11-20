import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useRouteMatch, Link } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'

import { Header, RepositoryInfo, Issues } from './styles'

interface IRepositoryParams {
  repository: string
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<IRepositoryParams>()

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img
            src="https://avatars0.githubusercontent.com/u/28929274?v=4"
            alt="Rocketseat Unform"
          />
          <div>
            <strong>rockestes/unform</strong>
            <p>Descricao</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>134</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>45</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>1624</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to="asds">
          <div>
            <strong>asfasd</strong>
            <p>sdfasdfsdfadfa</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  )
}

export default Repository
