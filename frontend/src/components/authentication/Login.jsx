import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [show, setShow] = useState(false)

  const [picLoading, setPicLoading] = useState(false)

  const toast = useToast()

  const history = useHistory()

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setUser((u) => ({ ...u, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPicLoading(true)
    if (!user.email || !user.password) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setPicLoading(false)
      return
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }

      const { data } = await axios.post('/api/users/login', user, config)

      // console.log(JSON.stringify(data));
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      // setPicLoading(false)
      history.push('/chats')
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setPicLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="5">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
            value={user.email}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              name="password"
              placeholder="Enter Your Password"
              onChange={handleChange}
              value={user.password}
              type={show ? 'text' : 'password'}
            />
            <InputRightElement width="4.5rem">
              <Button h="1,75rem" size="sm" onClick={() => setShow((s) => !s)}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          type="submit"
          isLoading={picLoading}
        >
          Login
        </Button>
        <Button
          variant="solid"
          colorScheme="red"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={() =>
            setUser({
              email: 'guest@example.com',
              password: '123456',
            })
          }
        >
          Get Guest User's Credentials
        </Button>
      </VStack>
    </form>
  )
}

export default Login
