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

import { FormControl, FormLabel, Input, Select, Textarea } from '@chakra-ui/react';
import { Button } from 'react-bootstrap';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import GoogleMap from '../Maps/addPostMap';
import { withGlobalState } from 'react-globally'

const AddPost = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const [image, setImage] = useState("");


    const [itemTitle, setItemTitle] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [itemCategory, setItemCategory] = useState('')

    // console.log(props.globalState.mapCenter)


    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
            try {
                // read what's currently in the cache
                const { posts } = cache.readQuery({ query: QUERY_POSTS });

                // prepend the newest thought to the front of the array
                cache.writeQuery({
                    query: QUERY_POSTS,
                    data: { posts: [addPost, ...posts] }
                });
            } catch (e) {
                console.error(e);
            }

            try {
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, posts: [...me.posts, addPost] } }
                });
            } catch (e) {
                console.log(e);
            }

        }

    })


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
        onClose()

        try {
            await addPost({
                variables: { itemTitle, itemDescription, imageURL: imageUrlData.url, itemCategory, itemLat: `${props.globalState.mapCenter.lat}`, itemLng: `${props.globalState.mapCenter.lng}` }
            });
        } catch (e) {
            console.error(e);
            window.alert(e);
        }

    };


    return (
        <>
            <Button id="button" onClick={onOpen}>Add an Item</Button>

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
                            <FormLabel>Category</FormLabel>

                            <Select placeholder='Select option'
                                onChange={handleCategoryChange} >
                                <option value='building materials'>Building Materials</option>
                                <option value='clothing'>Clothing</option>
                                <option value='electronics'>Electronics</option>
                                <option value='furniture'>Furniture</option>
                                <option value='home and garden'>Home and Garden</option>
                                <option value='office supplies'>Office Supplies</option>
                                <option value='pet supplies'>Pet Supplies</option>
                                <option value='sports equipment'>Sports Equipment</option>
                                <option value='tools'>Tools</option>
                                <option value='other'>Other</option>
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Description of Item</FormLabel>
                            <Textarea placeholder='Describe this item'
                                type="text"
                                value={itemDescription}
                                onChange={handleDescriptionChange} />
                        </FormControl>
                        <FormLabel>Upload an Image:</FormLabel>
                        <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
                        <FormLabel>Location:</FormLabel>
                        <GoogleMap></GoogleMap>
                    </ModalBody>


                    <ModalFooter justifyContent="center">
                        <Button id="button" colorScheme='blue' mr={3}
                            onClick={handleFormSubmit}
                        >
                            Upload Post!
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}

export default withGlobalState(AddPost)