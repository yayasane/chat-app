import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getSender, getSenderFull } from '../config/ChatLogics'
import { useChatState } from '../contexts/chat/ChatProvider'
import ProfileModal from './miscellaneous/ProfileModal'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'
import ScrollableChat from './ScrollableChat'
import './styles.css'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([])

  const { user, selectedChat, setSelectedChat } = useChatState()

  const [loading, setLoading] = useState(false)

  const [newMessage, setNewMessage] = useState('')

  const toast = useToast()

  const fetchMessages = async () => {
    if (!selectedChat) return

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }

      setLoading(true)

      const { data } = await axios.get(
        `/api/messages/${selectedChat._id}`,
        config,
      )
      console.log(data)
      setMessages(data)
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Messages',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
    }
  }

  const typingHandler = (e) => {
    console.log('In typing', e.target.value)
    setNewMessage(e.target.value)
    // Typing Indicator Logic
  }

  const sendMessage = async (e) => {
    if (e.key === 'Enter' && newMessage) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }

        setNewMessage('')
        const { data } = await axios.post(
          '/api/messages',
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config,
        )
        setMessages([...messages, data])
      } catch (error) {
        toast({
          title: 'Error Occured!',
          description: 'Failed to send the Message',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      }
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [selectedChat])

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: 'space-between' }}
            alignItems="center"
          >
            <IconButton
              d={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat('')}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/* Messages here */}
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  )
}

export default SingleChat
