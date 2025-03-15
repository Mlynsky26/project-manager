import { useProjects } from '@/context/ProjectsContext';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEdit } from "react-icons/fa";
import ProjectForm from './ProjectForm';
import { Project } from '@/models/Project';
import { BaseProject } from '@/models/BaseProject';

type ProjectEditProps = {
    project: Project;
};

function EditProject({ project }: ProjectEditProps) {
    const [show, setShow] = useState(false);
    const { updateProject } = useProjects()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onEdit = (projectEdited: BaseProject) => {
        updateProject(project.id, projectEdited)
        setShow(false)
    }

    return (
        <>
            <Button variant='primary' onClick={handleShow}>
                <FaEdit />
            </Button>

            <Modal show={show} onHide={handleClose} className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProjectForm project={project} submitHandler={onEdit}></ProjectForm>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditProject