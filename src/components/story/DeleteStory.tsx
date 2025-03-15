import { useProjects } from '@/context/ProjectsContext';
import { Story } from '@/models/Story';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaTrash } from "react-icons/fa";

type StoryDeleteProps = {
    story: Story;
};

function DeleteStory({ story }: StoryDeleteProps) {
    const [show, setShow] = useState(false);
    const { deleteStory } = useProjects()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onDelete = () => {
        deleteStory(story.id)
        setShow(false)
    }

    return (
        <>
            <Button variant='danger' onClick={handleShow}>
                <FaTrash />
            </Button>

            <Modal show={show} onHide={handleClose} className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title><span className='text-danger'>Delete story</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Are you sure you want to delete this story?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="outline-danger" onClick={onDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteStory