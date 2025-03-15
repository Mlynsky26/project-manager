
import { Project } from '@/models/Project';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaInfo } from "react-icons/fa";

type ProjectDetailsProps = {
    project: Project;
};

function ProjectDetails({ project }: ProjectDetailsProps) {
    const [show, setShow] = useState(false);

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
                    <h4>Name: {project.name}</h4>
                    <p>Id: {project.id}</p>
                    <p>Description: {project.description}</p>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProjectDetails