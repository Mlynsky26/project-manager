import { useProjects } from '@/context/ProjectsContext';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEdit } from "react-icons/fa";
import { Task } from '@/models/Task';
import TaskForm, { TaskEdited } from './TaskForm';

type TaskEditProps = {
    task: Task;
};

function EditTask({ task }: TaskEditProps) {
    const [show, setShow] = useState(false);
    const { updateTask } = useProjects()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onEdit = (taskEdited: TaskEdited) => {
        updateTask(task.id, taskEdited)
        setShow(false)
    }

    return (
        <>
            <Button variant='primary' onClick={handleShow}>
                <FaEdit />
            </Button>

            <Modal show={show} onHide={handleClose} className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TaskForm task={task} submitHandler={onEdit}></TaskForm>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditTask