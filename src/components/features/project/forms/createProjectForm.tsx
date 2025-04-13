"use client";

import { useProjectsStore } from "@/providers/projectsProvider";
import { z } from "zod";
import { formSchema, ProjectForm } from "./projectForm";
import { toast } from "sonner";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import ActionButton from "@/components/shared/elements/actionButton";

export default function CreateProjectForm() {
  const addProject = useProjectsStore((state) => state.addProject);
  const handleCreate = async (values: z.infer<typeof formSchema>) => {
    try {
      await addProject({
        name: values.name,
        description: values.description,
      });
      toast.success("Pomyślnie utworzono projekt");
    } catch {
      toast.error("Nie udało się utworzyć projektu");
    }
  };

  return (
    <ProjectForm
      onSubmit={handleCreate}
      trigger={
        <ActionButton tooltip="Utwórz projekt" size="icon">
          <MdOutlineDashboardCustomize />
        </ActionButton>
      }
      title="Utwórz projekt"
    />
  );
}
