import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    pic: '',
  })

  const [show, setShow] = useState(false)

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setUser((u) => ({ ...u, [name]: value }))
  }

  const postDetails = (pics) => {}

  const handleSubmit = () => {}

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="5px">
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
            value={user.pic}
            type="file"
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          type="submit"
        >
          Sign Up
        </Button>
      </VStack>
    </form>
  )
}

export default Signup
