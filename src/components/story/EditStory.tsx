import { useProjects } from '@/context/ProjectsContext';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEdit } from "react-icons/fa";
import { Story } from '@/models/Story';
import StoryForm, { StoryEdited } from './StoryForm';

type StoryEditProps = {
    story: Story;
};

function EditStory({ story }: StoryEditProps) {
    const [show, setShow] = useState(false);
    const { updateStory } = useProjects()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onEdit = (storyEdited: StoryEdited) => {
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