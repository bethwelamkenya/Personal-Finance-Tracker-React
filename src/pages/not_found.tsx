import {useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import {Loading} from "../global_ui_components/loading";

const NotFound = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/home");
        }, 5000);

        return () => clearTimeout(timeout); // Cleanup on unmount
    }, [navigate]);

    return (
        <Box textAlign="center" mt={8}>
            <Typography variant="h4" color="error">
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" mt={2}>
                The page <strong>{location.pathname}</strong> does not exist.
            </Typography>
            <Typography variant="body2" mt={2}>
                Redirecting to the home page in 5 seconds...
            </Typography>
            <Loading/>
        </Box>
    );
};

export default NotFound;
