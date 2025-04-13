import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

type FormSuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="bg-green-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-600">
      <AiFillCheckCircle className="w-4 h-4" />
      {message}
    </div>
  );
};

export default FormSuccess;
