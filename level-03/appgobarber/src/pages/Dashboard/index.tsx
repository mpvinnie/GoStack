import React from 'react'

import { useAuth } from '../../hooks/auth'

import { Button } from 'react-native'

import { Container } from './styles'

const Dashboard: React.FC = () => {
  const { signOut } = useAuth()

  return (
    <Container>
      <Button title="Logout" onPress={signOut} />
    </Container>
  )
}

export default Dashboard
