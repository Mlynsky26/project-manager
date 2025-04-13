import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  header: string;
  message: string;
  trigger: React.ReactElement | string;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({
  header,
  message,
  trigger,
  onConfirm,
}) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {typeof trigger === "string" ? (
          <Button variant="destructive">{trigger}</Button>
        ) : (
          trigger
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{header}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Nie</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Tak
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
