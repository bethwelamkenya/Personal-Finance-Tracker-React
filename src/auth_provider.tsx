import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import {User} from "./classes/user";

// Define AuthContext
interface AuthContextType {
    user: any;  // Change this to your user type
    loading: boolean;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    server: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const server = "http://localhost:8080"
    // const server = "https://personalfinancetracker-production-3639.up.railway.app"

    const storedUser = localStorage.getItem("user")
    const [user, setUser] = useState<User | null>(User.fromJson(storedUser ? JSON.parse(storedUser) : ""));  // Store user data
    const [loading, setLoading] = useState(true);
    const [checkedAuth, setCheckedAuth] = useState(false); // Track if we checked authentication

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const excludedRoutes = ["/login", "/signup"];
        // Run this check only on the first load
        if (!checkedAuth) {
            if (!user) {
                setLoading(false);
                setCheckedAuth(false);
                navigate("/")
            } else {
                axios.get(`${server}/users/${user.id}`)
                // axios.get(`${server}/users/${user.id}`, {withCredentials: true})
                    .then((response) => {
                        if (response.data && response.status === 200) {
                            setUser(User.fromJson(response.data));
                            if (excludedRoutes.includes(location.pathname) || location.pathname === "/") {
                                navigate("/home"); // Redirect only on first load
                            }
                        } else {
                            if (!excludedRoutes.includes(location.pathname)) {
                                navigate("/");
                            }
                        }
                    })
                    .catch(() => {
                        if (!excludedRoutes.includes(location.pathname)) {
                            navigate("/");
                        }
                    })
                    .finally(() => {
                        setLoading(false);
                        setCheckedAuth(true); // Prevent further redirections
                    });
            }
        }
    }, [user, checkedAuth, navigate, location.pathname]);

    return (
        <AuthContext.Provider value={{user, loading, setUser, setLoading, server}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
