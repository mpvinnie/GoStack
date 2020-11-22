import React, { createContext, useCallback, useContext } from 'react'

import ToastContainer from '../components/ToastContainer'

interface IToastContextData {
  addToast(): void
  removeToast(): void
}

const ToastContext = createContext<IToastContextData>({} as IToastContextData)

const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('AddToast')
  }, [])

  const removeToast = useCallback(() => {
    console.log('RemoveToast')
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

function useToast(): IToastContextData {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export { ToastProvider, useToast }
