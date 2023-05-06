"use client";

import { useEffect } from "react";
import EmptyState from "./components/emptyState";

interface IErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<IErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorState;
