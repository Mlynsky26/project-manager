import { useProjects } from '@/context/ProjectsContext';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Task } from '@/models/Task';
import { UserRole, useUser } from '@/context/UserContext';
import { State } from '@/models/State';

type TaskAssignProps = {
    task: Task;
};

function AssignTask({ task }: TaskAssignProps) {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState('');
    const { updateTask } = useProjects()
    const { users } = useUser()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userOptions = users.filter(user => user.role === UserRole.DEVELOPER || user.role === UserRole.DEVOPS)
    if(userOptions.length > 0 && !user)
        setUser(userOptions[0].id)


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        task.user = user
        task.started_at = new Date().getTime()
        task.state = State.DOING
        updateTask(task.id, task)
        setShow(false)
    }

    return (
        <>
            <Button variant='primary' onClick={handleShow}>
                Assign user
            </Button>

            <Modal show={show} onHide={handleClose} className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Assign user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        userOptions ?
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="form-group mb-2">
                                    <label htmlFor="user-select">
                                        User
                                    </label>
                                    <select
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                        id="user-select"
                                        className="form-select"
                                    >
                                        {userOptions.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.firstName} { user.lastName} ({user.role})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                            : 'No users available'
                    }

                </Modal.Body>
            </Modal>
        </>
    );
}

export default AssignTask