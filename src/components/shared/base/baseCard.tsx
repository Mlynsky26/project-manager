import { formatDate } from "@/lib/utils/dateFormat";
import { ReactNode } from "react";
import { KanbanBase } from "@/types/kanbanBase";
import UpdateFormProps from "@/types/props/updateFormProps";
import ConfirmModal from "../elements/modals/confirmModal";
import ActionButton from "../elements/actionButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LuTrash2 } from "react-icons/lu";
import { useSession } from "@/lib/auth/authClient";

interface BaseCardProps<T extends KanbanBase> {
  item: T;
  onDelete: () => void;
  additionalActions?: ReactNode;
  additionalProperties?: ReactNode;
  UpdateFormComponent: React.ComponentType<UpdateFormProps<T>>;
}

export default function BaseCard<T extends KanbanBase>({
  item,
  onDelete,
  additionalActions,
  additionalProperties,
  UpdateFormComponent,
}: BaseCardProps<T>) {

  const session = useSession();
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <CardTitle className="break-all">{item.name}</CardTitle>
          <div className="flex flex-wrap gap-2 order-1 sm:order-2">
            {additionalActions}
            { session?.data?.user?.role !== "GUEST"  &&
                <>
                  <UpdateFormComponent item={item} />
                  <ConfirmModal
                    header="Usunięcie elementu"
                    message="Na pewno chcesz usunąć ten element?"
                    onConfirm={onDelete}
                    trigger={
                      <ActionButton
                        variant="destructive"
                        size="icon"
                        tooltip="Usuń element"
                      >
                        <LuTrash2 />
                      </ActionButton>
                    }
                  />
                </>
              }
          </div>
        </div>
      </CardHeader>

      <CardContent className="break-all">
        <div>
          <p>{item.description}</p>
          {additionalProperties}
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start">
        <p>
          <strong>Data utworzenia:</strong>{" "}
          {formatDate(item.createdAt)}
        </p>
        <p>
          <strong>Data aktualizacji:</strong>{" "}
          {formatDate(item.updatedAt)}
        </p>
      </CardFooter>
    </Card>
  );
}
