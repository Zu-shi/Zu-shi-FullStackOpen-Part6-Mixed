import { useReducer, useContext } from "react"
import { NotificationContext, setNotifications, NotificationProvider } from './NotificationContext'

const Notification = () => {
  const [notif, dispatch] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {notif}
    </div>
  )
}

export default Notification
