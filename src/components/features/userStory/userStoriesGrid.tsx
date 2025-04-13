import UserStory from "@/types/userStory";
import UserStoryCard from "./userStoryCard";
import GridColumn from "../../shared/layout/gridColumn";
import { UserStoryStatus } from "@prisma/client";

export default function UserStoriesGrid({
  userStories,
}: {
  userStories: UserStory[];
}) {

  if (userStories.length === 0) {
    return <p className="text-center">Brak historyjek</p>;
  }

  const pendingStories = userStories.filter(
    (userStory) => userStory.status === UserStoryStatus.PENDING
  );
  const inProgressStories = userStories.filter(
    (userStory) => userStory.status === UserStoryStatus.IN_PROGRESS
  );
  const completedStories = userStories.filter(
    (userStory) => userStory.status === UserStoryStatus.COMPLETED
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <GridColumn
        items={pendingStories}
        header="Oczekujące"
        emptyMessage="Brak oczekujących historyjek"
        Element={UserStoryCard}
      />
      <GridColumn
        items={inProgressStories}
        header="W trakcie"
        emptyMessage="Brak historyjek w trakcie"
        Element={UserStoryCard}
      />
      <GridColumn
        items={completedStories}
        header="Ukończone"
        emptyMessage="Brak ukończonych historyjek"
        Element={UserStoryCard}
      />
    </div>
  );
}
