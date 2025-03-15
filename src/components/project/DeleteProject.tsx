import { useProjects } from '@/context/ProjectsContext';
import { Project } from '@/models/Project';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaTrash } from "react-icons/fa";

type ProjectDeleteProps = {
    project: Project;
};

function DeleteProject({ project }: ProjectDeleteProps) {
    const [show, setShow] = useState(false);
    const { deleteProject } = useProjects()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onDelete = () => {
        deleteProject(project.id)
        setShow(false)
    }

    return (
        <>
            <Button variant='danger' onClick={handleShow}>
                <FaTrash />
            </Button>

            <Modal show={show} onHide={handleClose} className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title><span className='text-danger'>Delete project</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Are you sure you want to delete this project?
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

export default DeleteProject