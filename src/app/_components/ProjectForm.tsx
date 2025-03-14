import { Alert } from "react-bootstrap";
import { Project, ProjectUpdatable, } from "../context/ProjectsContext";
import { useState } from "react";

type ProjectFormProps = {
    project: {
        name: Project['name'],
        description: Project['description']
    };
    submitHandler: (project: ProjectUpdatable) => void
};

const ProjectForm = ({ project, submitHandler }: ProjectFormProps) => {

    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [error, setError] = useState('')

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name && description) {
            submitHandler({ name, description })
            setError('')
        } else {
            setError('Invalid data')
        }
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            {error ? <Alert variant="danger"> {error} </Alert> : null}
            <div className="form-group mb-2">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter project name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" placeholder="Enter project description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default ProjectForm;