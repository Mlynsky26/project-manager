import { Project, useProjects } from "../context/ProjectsContext";
import Link from "next/link";

type ProjectItemProps = {
    project: Project;
};

const ProjectItem = ({ project }: ProjectItemProps) => {
    const { markAsCurrentProject, isProjectCurrent } = useProjects()

    const markAsCurrent = () => {
        markAsCurrentProject(project.id)
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    {project.name}
                    {isProjectCurrent(project.id) ? <span className="text-primary ms-2">Current</span> : null}
                </h5>
                <p className="card-text">{project.description}</p>
                <Link href={`/projects/${project.id}`} className="btn btn-primary me-2">
                    View Details
                </Link>
                <button className="btn btn-secondary" onClick={() => markAsCurrent()}>Mark as currrent</button>
            </div>
        </div>
    );
};

export default ProjectItem;