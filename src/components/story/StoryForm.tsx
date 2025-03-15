import { Alert } from "react-bootstrap";
import { useState } from "react";
import { BaseStory } from "@/models/BaseStory";
import { useProjects } from "@/context/ProjectsContext";
import { useUser } from "@/context/UserContext";
import { Priority } from "@/models/Priority";
import { State } from "@/models/State";

type StoryFormProps = {
    story: {
        name: string,
        description: string,
        priority: Priority
        state: State
    }
    submitHandler: (story: BaseStory) => void
};

const StoryForm = ({ story, submitHandler }: StoryFormProps) => {

    const { currentProjectId } = useProjects()
    const { user } = useUser()
    const [name, setName] = useState(story.name)
    const [description, setDescription] = useState(story.description)
    const [priority, setPriority] = useState(story.priority)
    const [state, setState] = useState(story.state)
    const [error, setError] = useState('')

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name && description && priority) {
            submitHandler({
                name,
                description,
                priority,
                project: currentProjectId,
                created_at: new Date().getTime(),
                state: state,
                user: user ? user.id : ''
            })
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

            <div className="form-group mb-2">
                <label htmlFor="priority-select">
                    Priority
                </label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    id="priority-select"
                    className="form-select"
                >
                    {Object.values(Priority).map((priority) => (
                        <option key={priority} value={priority}>
                            {priority}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group mb-2">
                <label htmlFor="priority-select">
                    State
                </label>
                <select
                    value={state}
                    onChange={(e) => setState(e.target.value as State)}
                    id="state-select"
                    className="form-select"
                >
                    {Object.values(State).map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default StoryForm;