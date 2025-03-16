import { User } from "@/context/UserContext"
import { Priority } from "./Priority"
import { State } from "./State"
import { Story } from "./Story"

export type BaseTask = {
    name: string
    description: string
    priority: Priority
    story: Story['id']
    estimated_time: number
    state: State,
    created_at: number
    started_at?: number
    completed_at?: number
    user?: User['id']
}
