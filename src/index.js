import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationContext, setNotifications, NotificationProvider } from './components/NotificationContext'



const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotificationProvider>
)