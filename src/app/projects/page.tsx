'use client';

import { useProjects } from '@/context/ProjectsContext';
import { Container, Row } from 'react-bootstrap';
import ProjectItem from '@/components/project/ProjectItem';
import AddProject from '@/components/project/AddProject';

const ProjectsPage = () => {
    const { projects } = useProjects()

    return (
        <Container>
            <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                <h1>Your projects</h1>
                <AddProject></AddProject>
            </div>
            <Row>
                {projects.length === 0 ? (
                    <h3 className='mt-3'>No projects found</h3>
                ) : (
                    projects.map((project) => (
                        <div className="col-md-4 mb-4" key={project.id}>
                            <ProjectItem project={project} />
                        </div>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default ProjectsPage;