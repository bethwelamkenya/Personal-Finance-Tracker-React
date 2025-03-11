import React from "react";
import {Container, Button, Typography, Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import {Mail} from "@mui/icons-material";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="xs" sx={{textAlign: "center", mt: 8}}>
            <Typography variant="h4" gutterBottom>
                Welcome to Our App
            </Typography>
            <Typography variant="body1" sx={{mb: 4}}>
                Sign in to access your account
            </Typography>

            {/* Email Login Button */}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<Mail/>}
                sx={{mb: 2}}
                onClick={() => navigate("/login")}
            >
                Use Email
            </Button>

            {/* Google Login */}
            <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon/>}
                sx={{mb: 2}}
                onClick={() => alert("Google Login Clicked!")} // Replace with OAuth
            >
                Continue with Google
            </Button>

            {/* Facebook Login */}
            <Button
                variant="outlined"
                fullWidth
                startIcon={<FacebookIcon/>}
                onClick={() => alert("Facebook Login Clicked!")} // Replace with OAuth
            >
                Continue with Facebook
            </Button>

            {/* Signup Redirect */}
            <Box mt={2}>
                <Typography variant="body2">
                    Don't have an account?{" "}
                    <Button color="primary" onClick={() => navigate("/signup")}>
                        Sign Up
                    </Button>
                </Typography>
            </Box>
        </Container>
    );
};

export default LandingPage;
