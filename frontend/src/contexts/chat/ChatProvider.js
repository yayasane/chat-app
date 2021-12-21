import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [chats, setChats] = useState()
  const [selectedChat, setSelectedChat] = useState()
  const [notifications, setNotifications] = useState([])

  const history = useHistory()

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    setUser(userInfo)
    if (!userInfo) {
      history.push('/')
    }
    console.log(history.location.pathname)
    console.log(history.location)
  }, [history])
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatState = () => {
  return useContext(ChatContext)
}
