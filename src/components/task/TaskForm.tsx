import { Alert } from "react-bootstrap";
import { useState } from "react";
import { useProjects } from "@/context/ProjectsContext";
import { Priority } from "@/models/Priority";

export type TaskEdited = {
    name: string,
    description: string,
    priority: Priority
    story: string
    estimated_time: number
}

type TaskFormProps = {
    task: TaskEdited
    submitHandler: (task: TaskEdited) => void
};

const TaskForm = ({ task, submitHandler }: TaskFormProps) => {
    const { stories } = useProjects()
    const [name, setName] = useState(task.name)
    const [description, setDescription] = useState(task.description)
    const [priority, setPriority] = useState(task.priority)
    const [story, setStory] = useState(task.story)
    const [estimatedTime, setEstimatedTime] = useState(task.estimated_time)
    const [error, setError] = useState('')

    if (stories.length == 0)
        return 'No available stories'

    if (!story)
        setStory(stories[0].id)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name &&
            description &&
            priority &&
            story &&
            estimatedTime > 0) {
            submitHandler({
                name,
                description,
                priority,
                story,
                estimated_time: estimatedTime,
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
                <label htmlFor="estimated-time">Estimated time</label>
                <input type="number" className="form-control" id="estimated-time" placeholder="Enter estimated time" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value as unknown as number)} />
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
                <label htmlFor="story-select">
                    Story
                </label>
                <select
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    id="story-select"
                    className="form-select"
                >
                    {stories.map((story) => (
                        <option key={story.id} value={story.id}>
                            {story.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default TaskForm;