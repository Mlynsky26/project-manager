'use client';

import { useProjects } from '@/context/ProjectsContext';
import { Container, Row } from 'react-bootstrap';
import AddStory from '@/components/story/AddStory';
import StoryItem from '@/components/story/StoryItem';
import { State } from '@/models/State';

const StoriesPage = () => {
    const { stories } = useProjects()
    const groupedStories = Object.values(State).map((state) => (
        <div key={state}>
            <h2>Stories with status: {state}</h2>
            <Row>
                {stories.filter((story) => story.state == state).map(story => (
                    <div className="col-md-4 mb-4" key={story.id}>
                        <StoryItem story={story} />
                    </div>
                ))}
            </Row>
        </div>
    ))

    return (
        <Container>
            <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                <h1>Your stories</h1>
                <AddStory></AddStory>
            </div>
            {groupedStories}
        </Container>
    );
};

export default StoriesPage;