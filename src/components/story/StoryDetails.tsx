
import { useUser } from '@/context/UserContext';
import { Story } from '@/models/Story';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaInfo } from "react-icons/fa";

type StoryDetailsProps = {
    story: Story;
};

function StoryDetails({ story }: StoryDetailsProps) {
    const [show, setShow] = useState(false);
    const { user } = useUser()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant='info' onClick={handleShow}>
                <FaInfo />
            </Button>

            <Modal show={show} onHide={handleClose} className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Project info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Name: {story.name}</h4>
                    <p>Id: {story.id}</p>
                    <p>Project: {story.project}</p>
                    <p>Date: {new Date(story.created_at).toLocaleString()}</p>
                    <div className='mb-3'>Owner:
                        {
                            user
                                ?
                                <ul>
                                    <li>Id: {user?.id}</li>
                                    <li>Fullname: {user?.firstName} {user?.lastName}</li>
                                </ul>
                                :
                                'unknown'
                        }
                    </div>
                    <p>Description: {story.description}</p>
                    <p>Priority: {story.priority}</p>
                    <p>State: {story.state}</p>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default StoryDetails