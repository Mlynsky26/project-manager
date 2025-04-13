import { useProjectsStore } from "@/providers/projectsProvider";
import { FaRegCheckSquare, FaCheckSquare } from "react-icons/fa";
import UpdateProjectForm from "./forms/updateProjectForm";
import ConfirmModal from "@/components/shared/elements/modals/confirmModal";
import Project from "@/types/project";
import { toast } from "sonner";
import BaseCard from "../../shared/base/baseCard";
import ActionButton from "@/components/shared/elements/actionButton";
import { useSession, updateUser } from "@/lib/auth/authClient";
import Spinner from "@/components/shared/elements/spinner";

export default function ProjectCard(project: Project) {
  const deleteProject = useProjectsStore((state) => state.deleteProject);
  const { data, isPending } = useSession();
  const user = data?.user;

  const handleDelete = async () => {
    try {
      await deleteProject(project.id);
      toast.success("Pomyślnie usunięto projekt");
    } catch {
      toast.error("Nie udało się usunąć projektu");
    }
  };

  const handleSetActiveProject = async () => {
    try {
      const { error } = await updateUser({
        activeProjectId: project.id,
      });
      if (error) {
        throw error;
      }

      toast.success("Pomyślnie ustawiono projekt jako aktywny");
    } catch {
      toast.error("Nie udało się ustawić projektu jako aktywnego");
    }
  };

  const handleUnsetActiveProject = async () => {
    try {
      const { error } = await updateUser({
        activeProjectId: null,
      });
      if (error) {
        throw error;
      }
      toast.success("Pomyślnie usunięto aktywny projekt");
    } catch {
      toast.error("Nie udało się usunąć aktywnego projektu");
    }
  };
  const additionalActions = (
    <>
      {user?.activeProjectId == project.id ? (
        <ConfirmModal
          header="Usunięcie aktywnego projektu"
          message="Na pewno chcesz usunąć aktywny projekt?"
          onConfirm={handleUnsetActiveProject}
          trigger={
            <ActionButton
              variant="default"
              size="icon"
              tooltip="Usuń aktywny projekt"
            >
              <FaCheckSquare />
            </ActionButton>
          }
        />
      ) : (
        <ConfirmModal
          header="Ustawienie aktywnego projektu"
          message="Na pewno chcesz ustawić ten projekt jako aktywny?"
          onConfirm={handleSetActiveProject}
          trigger={
            <ActionButton
              variant="default"
              size="icon"
              tooltip="Ustaw aktywny projekt"
            >
              <FaRegCheckSquare />
            </ActionButton>
          }
        />
      )}
    </>
  );

  if (isPending) return <Spinner />;

  return (
    <BaseCard<Project>
      item={project}
      onDelete={handleDelete}
      additionalActions={additionalActions}
      UpdateFormComponent={UpdateProjectForm}
    />
  );
}
