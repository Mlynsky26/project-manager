'use client';

import { Alert, Container} from 'react-bootstrap';
import { useProjects } from '@/app/context/ProjectsContext';
import { redirect, useParams } from 'next/navigation';
import Link from 'next/link';

const ProjectPage = () => {
    const params = useParams<{ project_id: string }>()
    const { getProject, markAsCurrentProject, isProjectCurrent } = useProjects()
    const project = getProject(params.project_id)
    
    if(!project){
        redirect('/not-found')
    }

    const markAsCurrent = () => {
        markAsCurrentProject(project.id)
    }

    return (
        <Container>
            <h1>Project</h1>
            { isProjectCurrent(project.id) ? <Alert variant='info'>This project is marked as current</Alert> : null }
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <Link href={`/projects/${project.id}/edit`} className="btn btn-primary me-2">Edit</Link>
            <button className="btn btn-secondary" onClick={() => markAsCurrent()}>Mark as currrent</button>
        </Container>
    );
};

export default ProjectPage;