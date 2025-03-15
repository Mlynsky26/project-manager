import { useProjects } from '@/context/ProjectsContext';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from "react-icons/fa";
import ProjectForm from './ProjectForm';
import { BaseProject } from '@/models/BaseProject';

function AddProject() {
    const [show, setShow] = useState(false);
    const { addProject } = useProjects()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onAdd = (project: BaseProject) => {
        addProject(project)
        setShow(false)
    }

    return (
        <>
            <Button variant='primary' className="d-flex align-items-center gap-1" onClick={handleShow}>
                <FaPlus/> Add project
            </Button>

            <Modal show={show} onHide={handleClose} className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Add project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProjectForm project={{ name: '', description: ''}} submitHandler={onAdd}></ProjectForm>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddProject