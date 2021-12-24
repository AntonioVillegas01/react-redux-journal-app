
import { Redirect } from "react-router-dom";

export const PublicRoute = ({isAuthenticated,children}) => {
    return isAuthenticated
        ? <Redirect to={'/'}/>
        : children
};
