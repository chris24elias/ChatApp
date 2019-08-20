import { useContext } from "react";
import AuthStateContext from "./AuthContext";

interface AuthContext {
    state: string;
    logout: any;
    login: any;
}

const useAuth = () => {
    let auth: AuthContext = useContext(AuthStateContext);
    return auth;
};

export default useAuth;
