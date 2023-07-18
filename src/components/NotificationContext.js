import { createContext, useReducer, useContext, useEffect } from 'react'

export const NotificationContext = createContext()

export const setNotifications = (state, action) => {
  console.log(action)
  switch (action.type) {
    case 'SET':
      //setTimeout(setNotifications('', { type: 'RESET' }), 5000);
      console.log("test");
      return action.payload
    case 'RESET':
      return ''
    default:
      return ''
  }
}

export const NotificationProvider = ({ children }) => {

  const [notif, dispatch] = useReducer(setNotifications, '')

  return (
    <NotificationContext.Provider value={[notif, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}