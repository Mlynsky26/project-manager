
import { useProjects } from '@/context/ProjectsContext';
import { useUser } from '@/context/UserContext';
import { Task } from '@/models/Task';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaInfo } from "react-icons/fa";

type TaskDetailsProps = {
    task: Task;
};

function TaskDetails({ task }: TaskDetailsProps) {
    const [show, setShow] = useState(false);
    const { getUser } = useUser()
    const { getStory } = useProjects()
    const story = getStory(task.story)
    const user = task.user ? getUser(task.user) : null

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant='info' onClick={handleShow}>
                <FaInfo />
            </Button>

            <Modal show={show} onHide={handleClose} className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Task info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Name: {task.name}</h4>
                    <p>Id: {task.id}</p>
                    <div className="mb-3">Story: {task.story}
                        {story ?
                            <ul>
                                <li>{story.name}</li>
                            </ul>
                            : 'Not found'}
                    </div>
                    <p>Estimated time: {task.estimated_time}</p>
                    <p>Created at: {new Date(task.created_at).toLocaleString()}</p>
                    <p>Started at: { task.started_at ? new Date(task.started_at).toLocaleString() : ''}</p>
                    <p>Completed at: {task.completed_at ? new Date(task.completed_at).toLocaleString() : ''}</p>
                    <div className='mb-3'>Assigned to:
                        {user ?
                            <ul>
                                <li>Id: {user?.id}</li>
                                <li>Fullname: {user?.firstName} {user?.lastName}</li>
                                <li>Role: {user?.role}</li>
                            </ul>
                            : 'Not assigned'}
                    </div>
                    <p>Description: {task.description}</p>
                    <p>Priority: {task.priority}</p>
                    <p>State: {task.state}</p>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default TaskDetails