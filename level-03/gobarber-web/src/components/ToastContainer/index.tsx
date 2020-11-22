import React from 'react'

import { IToastMessage } from '../../hooks/toast'

import Toast from './Toast'

import { Container } from './styles'

interface IToastContainerProps {
  messages: IToastMessage[]
}

const ToastContainer: React.FC<IToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map((message) => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  )
}

export default ToastContainer
