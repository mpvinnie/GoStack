import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { Title, Form, Repositories } from './styles'

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="test">
          <img
            src="https://avatars0.githubusercontent.com/u/61069632?s=460&u=391398af44b8d1dad0f5429ef13cdad22066ea9f&v=4"
            alt="Vinicius Peres"
          />
          <div>
            <strong>vinnie/Gostack</strong>
            <p>Repositorio do bootcamp Gostack</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="test">
          <img
            src="https://avatars0.githubusercontent.com/u/61069632?s=460&u=391398af44b8d1dad0f5429ef13cdad22066ea9f&v=4"
            alt="Vinicius Peres"
          />
          <div>
            <strong>vinnie/Gostack</strong>
            <p>Repositorio do bootcamp Gostack</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="test">
          <img
            src="https://avatars0.githubusercontent.com/u/61069632?s=460&u=391398af44b8d1dad0f5429ef13cdad22066ea9f&v=4"
            alt="Vinicius Peres"
          />
          <div>
            <strong>vinnie/Gostack</strong>
            <p>Repositorio do bootcamp Gostack</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="test">
          <img
            src="https://avatars0.githubusercontent.com/u/61069632?s=460&u=391398af44b8d1dad0f5429ef13cdad22066ea9f&v=4"
            alt="Vinicius Peres"
          />
          <div>
            <strong>vinnie/Gostack</strong>
            <p>Repositorio do bootcamp Gostack</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  )
}

export default Dashboard
