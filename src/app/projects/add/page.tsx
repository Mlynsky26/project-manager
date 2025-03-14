'use client';

import { Container} from 'react-bootstrap';
import { ProjectUpdatable, useProjects } from '@/app/context/ProjectsContext';
import { redirect } from 'next/navigation';
import ProjectForm from '@/app/_components/ProjectForm';

const AddProjectPage = () => {
    const { addProject } = useProjects()

    const onSubmit = (project: ProjectUpdatable) => {
        addProject(project)
        redirect('/projects');
    }

    return (
        <Container>
            <h1>Add projects</h1>
            <ProjectForm project={{name: '', description: ''}} submitHandler={onSubmit}></ProjectForm>
        </Container>
    );
};

export default AddProjectPage;