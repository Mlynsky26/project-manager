import { useProjects } from "@/context/ProjectsContext";
import EditProject from "./EditProject";
import ProjectDetails from "./ProjectDetails";
import { FaCheck } from "react-icons/fa";
import { Button } from "react-bootstrap";
import DeleteProject from "./DeleteProject";
import { Project } from "@/models/Project";

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
            <div className="card-header d-flex justify-content-between flex-wrap gap-2 align-items-center">
                <h5 className="card-title mb-0">
                    {project.name}
                    {isProjectCurrent(project.id) ? <span className="text-success ms-2"><FaCheck /></span> : null}
                </h5>
                <div className="d-flex gap-1">
                    {
                        !isProjectCurrent(project.id)
                            ?
                            <Button variant="success" onClick={markAsCurrent}><FaCheck /></Button>
                            :
                            null
                    }
                    <EditProject project={project}></EditProject>
                    <ProjectDetails project={project}></ProjectDetails>
                    <DeleteProject project={project}></DeleteProject>
                </div>
            </div>
            <div className="card-body">
                <p>{project.description}</p>
            </div>
        </div>
    );
};

export default ProjectItem;