import { User } from "@/context/UserContext"
import { Priority } from "./Priority"
import { Project } from "./Project"
import { State } from "./State"

export type BaseStory = {
    name: string
    description: string
    priority: Priority
    project: Project['id']
    created_at: number
    state: State,
    user: User['id']
}
