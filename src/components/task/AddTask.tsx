import { useProjects } from '@/context/ProjectsContext';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from "react-icons/fa";
import { Priority } from '@/models/Priority';
import { State } from '@/models/State';
import TaskForm, { TaskEdited } from './TaskForm';

function AddTask() {
    const [show, setShow] = useState(false);
    const { addTask} = useProjects()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onAdd = (task: TaskEdited) => {
        addTask({
            ...task,
            state: State.TODO,
            created_at: new Date().getTime(),

        })
        setShow(false)
    }

    return (
        <>
            <Button variant='primary' className="d-flex align-items-center gap-1" onClick={handleShow}>
                <FaPlus /> Add task
            </Button>

            <Modal show={show} onHide={handleClose} className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Add task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TaskForm task={{
                        name: '',
                        description: '',
                        priority: Priority.LOW,
                        estimated_time: 0,
                        story: '',
                    }} submitHandler={onAdd}></TaskForm>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddTask