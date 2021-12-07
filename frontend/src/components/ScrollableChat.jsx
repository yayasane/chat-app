import { Avatar, Tooltip } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import {
  isLatMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../config/ChatLogics'
import { useChatState } from '../contexts/chat/ChatProvider'

const ScrollableChat = ({ messages }) => {
  const { user } = useChatState()

  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  })

  return (
    <>
      {messages &&
        messages.map((m, i) => (
          <div key={m._id} ref={scrollRef} style={{ display: 'flex' }}>
            {(isSameSender(messages, m, i, user._id) ||
              isLatMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'
                }`,
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '75%',
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 10 : 3,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </>
  )
}

export default ScrollableChat
