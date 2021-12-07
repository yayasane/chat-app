import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState()
  const history = useHistory()

  const [chats, setChats] = useState()
  const [selectedChat, setSelectedChat] = useState()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    setUser(userInfo)
    if (!userInfo) {
      history.push('/')
    }
  }, [history])
  return (
    <ChatContext.Provider
      value={{ user, setUser, chats, setChats, selectedChat, setSelectedChat }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatState = () => {
  return useContext(ChatContext)
}
