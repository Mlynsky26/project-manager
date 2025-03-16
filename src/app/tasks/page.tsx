'use client';

import { useProjects } from '@/context/ProjectsContext';
import { Container, Row } from 'react-bootstrap';
import { State } from '@/models/State';
import AddTask from '@/components/task/AddTask';
import TaskItem from '@/components/task/Tasktem';

const TasksPage = () => {
    const { tasks } = useProjects()
    const groupedTasks = Object.values(State).map((state) => (
        <div key={state} className='col-12 col-md-4'>
            <h2>{state}</h2>
            {tasks.filter((task) => task.state == state).map(task => (
                <div className="mb-3" key={task.id}>
                    <TaskItem task={task} />
                </div>
            ))}
        </div>
    ))

    return (
        <Container>
            <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                <h1>Your tasks</h1>
                <AddTask></AddTask>
            </div>
            <Row>
                {groupedTasks}
            </Row>
        </Container>
    );
};

export default TasksPage;