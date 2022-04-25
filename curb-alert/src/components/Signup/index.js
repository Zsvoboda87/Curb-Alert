import React, { useState } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'

import { FormControl, FormLabel, Input, Select, Textarea, Flex } from '@chakra-ui/react';
import { Button } from 'react-bootstrap';

function SignUp() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef()
    const finalRef = React.useRef()
  
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
        <Button ml={4} ref={finalRef}>
          I'll receive focus on close
        </Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input ref={initialRef} placeholder='Username' />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Email' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input placeholder='Password' />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default SignUp;