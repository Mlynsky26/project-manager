'use client';

import { Container} from 'react-bootstrap';
import { ProjectUpdatable, useProjects } from '@/app/context/ProjectsContext';
import { redirect, useParams } from 'next/navigation';
import ProjectForm from '@/app/_components/ProjectForm';

const EditProjectPage = () => {
    const params = useParams<{ project_id: string }>()
    const { updateProject, getProject } = useProjects()
    const project = getProject(params.project_id)

    if(!project){
        redirect('/not-found')
    }

    const onSubmit = (projectEdited: ProjectUpdatable) => {
        updateProject({...project, ...projectEdited})
        redirect(`/projects/${project.id}`);
    }

    return (
        <Container>
            <h1>Edit project</h1>
            <ProjectForm project={{name: project.name, description: project.description}} submitHandler={onSubmit}></ProjectForm>
        </Container>
    );
};

export default EditProjectPage;