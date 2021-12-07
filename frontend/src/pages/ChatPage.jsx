import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import ChatBox from '../components/ChatBox'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import { useChatState } from '../contexts/chat/ChatProvider'

const ChatPage = () => {
  const { user } = useChatState()
  const [fetchAgain, setFetchAgain] = useState(false)
  return (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  )
}

export default ChatPage
