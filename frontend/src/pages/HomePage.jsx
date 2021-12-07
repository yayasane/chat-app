import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'

const HomePage = () => {
  const history = useHistory()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'))

    if (user) history.push('/chats')
  }, [history])
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="20px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work Sans">
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        color="black"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage
