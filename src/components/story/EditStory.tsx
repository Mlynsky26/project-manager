import { useProjects } from '@/context/ProjectsContext';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEdit } from "react-icons/fa";
import { BaseStory } from '@/models/BaseStory';
import { Story } from '@/models/Story';
import StoryForm from './StoryForm';

type StoryEditProps = {
    story: Story;
};

function EditStory({ story }: StoryEditProps) {
    const [show, setShow] = useState(false);
    const { updateStory } = useProjects()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onEdit = (storyEdited: BaseStory) => {
        updateStory(story.id, storyEdited)
        setShow(false)
    }

    return (
        <>
            <Button variant='primary' onClick={handleShow}>
                <FaEdit />
            </Button>

            <Modal show={show} onHide={handleClose} className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit story</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StoryForm story={story} submitHandler={onEdit}></StoryForm>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditStory