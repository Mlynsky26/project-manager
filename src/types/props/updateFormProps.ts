import { KanbanBase } from "../kanbanBase";

export default interface UpdateFormProps<T extends KanbanBase = KanbanBase> {
  item: T;
}
