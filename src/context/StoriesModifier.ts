import { BaseStory } from "@/models/BaseStory";
import { Story } from "@/models/Story";
import { v4 as uuid } from 'uuid'
import { Dispatch, SetStateAction } from "react";
import { StoryService } from "@/services/StoryService";

export class StoriesModifier {
    static getModifiers(
        stories: Story[],
        setStories: Dispatch<SetStateAction<Story[]>>,
        currentProjectId: string,
    ): StoriesModifiersType {
        const addStory = (story: BaseStory) => {
            const newStory = { id: uuid(), ...story };
            StoryService.add(newStory)
            setStories(StoryService.getAllForProject(currentProjectId));
        };

        const getStory = (storyId: string): Story | null => {
            return stories.find(story => story.id === storyId) ?? null
        };

        const updateStory = (storyId: string, storyPartial: Partial<Story>) => {
            StoryService.update(storyId, storyPartial)
            setStories(StoryService.getAllForProject(currentProjectId));
        };

        const deleteStory = (storyId: string) => {
            StoryService.delete(storyId)
            setStories(StoryService.getAllForProject(currentProjectId));
        };

        return {
            addStory,
            getStory,
            updateStory,
            deleteStory
        }
    }
}

export type StoriesModifiersType = {
    addStory: (story: BaseStory) => void
    getStory: (storyId: string) => Story | null
    updateStory: (storyId: string, storyPartial: Partial<Story>) => void
    deleteStory: (storyId: string) => void
}