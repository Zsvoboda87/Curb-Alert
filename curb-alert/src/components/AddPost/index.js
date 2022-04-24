import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
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

import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';


export default function AddPost() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const [image, setImage] = useState("");
    const [imageURL, setImageURL] = useState("");

    const [itemTitle, setItemTitle] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [itemCategory, setItemCategory] = useState('')

    const [addPost, { error }] = useMutation(ADD_POST)


    const handleTitleChange = event => {
        if (event.target.value.length <= 280) {
            setItemTitle(event.target.value);
        }
    };

    const handleDescriptionChange = event => {
        if (event.target.value.length <= 280) {
            setItemDescription(event.target.value);
        }
    };
    const handleCategoryChange = event => {
        if (event.target.value.length <= 280) {
            setItemCategory(event.target.value);
        }
    };

    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "zmzaqmwv")
        data.append("cloud_name", "dqxbjpdda")
        return fetch("https://api.cloudinary.com/v1_1/dqxbjpdda/image/upload",
            {
                method: "post",
                body: data
            })
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        const responseData = await uploadImage()
        const imageUrlData = await responseData.json()
        console.log(imageUrlData.url)
        setImageURL(imageUrlData.url)

        try {
            await addPost({
                variables: { itemTitle, itemDescription, imageURL, itemCategory }
            });
        } catch (e) {
            console.error(e);
        }

    };



    return (
        <>
            <Button onClick={onOpen}>Add an Item</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add an item to the curb!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Item Title</FormLabel>
                            <Input ref={initialRef} placeholder='Post Title'
                                type="text"
                                value={itemTitle}
                                onChange={handleTitleChange} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Write a Description of </FormLabel>
                            <Input placeholder='Describe this item'
                                type="text"
                                value={itemDescription}
                                onChange={handleDescriptionChange} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Category</FormLabel>
                            <Input placeholder='Select a Category'
                                type="text"
                                value={itemCategory}
                                onChange={handleCategoryChange} />
                        </FormControl>
                        <FormLabel>Upload an Image:</FormLabel>
                        <Input type="file" onChange={(e) => setImage(e.target.files[0])} />

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}
                            onClick={handleFormSubmit && onClose} >
                            Upload Post!
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}