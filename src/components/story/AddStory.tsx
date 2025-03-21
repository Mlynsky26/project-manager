import { useProjects } from '@/context/ProjectsContext';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from "react-icons/fa";
import StoryForm, { StoryEdited } from './StoryForm';
import { Priority } from '@/models/Priority';
import { State } from '@/models/State';
import { useUser } from '@/context/UserContext';

function AddStory() {
    const [show, setShow] = useState(false);
    const { addStory, currentProjectId } = useProjects()
    const { user } = useUser()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onAdd = (story: StoryEdited) => {

        addStory({
            ...story,
            project: currentProjectId,
            created_at: new Date().getTime(),
            user: user ? user.id : ''
        })
        setShow(false)
    }

    return (
        <>
            <Button variant='primary' className="d-flex align-items-center gap-1" onClick={handleShow}>
                <FaPlus /> Add story
            </Button>

            <Modal show={show} onHide={handleClose} className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Add story</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StoryForm story={{ name: '', description: '', priority: Priority.LOW, state: State.TODO }} submitHandler={onAdd}></StoryForm>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddStory