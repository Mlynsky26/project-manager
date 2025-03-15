import { Story } from "@/models/Story";
import EditStory from "./EditStory";
import StoryDetails from "./StoryDetails";
import DeleteStory from "./DeleteStory";

type StoryItemProps = {
    story: Story;
};

const StoryItem = ({ story }: StoryItemProps) => {
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between flex-wrap gap-2 align-items-center">
                <h5 className="card-title mb-0">
                    {story.name}
                </h5>
                <div className="d-flex gap-1">
                    <EditStory story={story}></EditStory>
                    <StoryDetails story={story}></StoryDetails>
                    <DeleteStory story={story}></DeleteStory>
                </div>
            </div>
            <div className="card-body">
                <p>{story.description}</p>
                <p>State: {story.state}</p>
                <p>Priority: {story.priority}</p>
            </div>
        </div>
    );
};

export default StoryItem;