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
import { useHistory } from 'react-router-dom'

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    pic: '',
  })

  const [PicLoading, setPicLoading] = useState(false)

  const [show, setShow] = useState(false)

  const toast = useToast()

  const history = useHistory()

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setUser((u) => ({ ...u, [name]: value }))
  }

  const postDetails = (pics) => {
    setPicLoading(true)
    if (pics === undefined) {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'chat-app')
      data.append('cloud_name', 'yayaveli')
      fetch('https://api.cloudinary.com/v1_1/yayaveli/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setUser((u) => ({ ...u, pic: data.url }))
          setPicLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setPicLoading(false)
        })
    } else {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setPicLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPicLoading(true)
    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
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
    if (user.password !== user.confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }
    console.log(user.name, user.email, user.password, user.pic)
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }
      const { data } = await axios.post('/api/users', user, config)
      console.log(data)
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      setPicLoading(false)
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
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            placeholder="Enter Your Name"
            onChange={handleChange}
            value={user.name}
          />
        </FormControl>
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
        <FormControl id="confirmPassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              name="confirmPassword"
              placeholder="Confirm Your Password"
              onChange={handleChange}
              value={user.confirmPassword}
              type={show ? 'text' : 'password'}
            />
            <InputRightElement width="4.5rem">
              <Button h="1,75rem" size="sm" onClick={() => setShow((s) => !s)}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="pic" isRequired>
          <FormLabel>Upload your Picture</FormLabel>
          <Input
            name="pic"
            onChange={(e) => postDetails(e.target.files[0])}
            p={1.5}
            accept="image/*"
            type="file"
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          type="submit"
          isLoading={PicLoading}
        >
          Sign Up
        </Button>
      </VStack>
    </form>
  )
}

export default Signup
