import React, { ReactElement, ReactNode } from "react";
import { Route } from "react-router-dom";
import NotAuthorized from "../pages/Error/NotAuthorized";

interface Props {
  component: ReactElement;
  user: string
}

export const ProtectedRoute: React.FC<Props> = ({ component, user }) => {
    if(!user){
        return <NotAuthorized></NotAuthorized>
    }
    return component
};