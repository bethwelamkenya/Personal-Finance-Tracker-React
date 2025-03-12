import React, {useState} from "react";
import {
    Container, TextField, Button, Checkbox, FormControlLabel, Typography,
    Box, Paper, Link, IconButton
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import axios from "axios";
import {User} from "../classes/user";
import {Loading} from "../global_ui_components/loading";

interface LoginProps {
    onUserLoggedIn : (user: User | null) => void
}

const LoginPage: React.FC<LoginProps> = ({onUserLoggedIn}) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [passwordHash, setPasswordHash] = useState("");
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setError("");
        setSuccess("");
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:8080/users/login", {
                email,
                passwordHash,
            });

            // Handle successful login (e.g., store token)
            const user = User.fromJson(response.data)
            localStorage.setItem("user", JSON.stringify(user)); // Assuming backend returns a JWT
            onUserLoggedIn(user)
            setSuccess("Login successful! Redirecting...");
            setTimeout(() => navigate("/home"), 2000);
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err)
            setError(err.response.data.error || "Login failed!");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box display="flex" justifyContent="flex-start">
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBack fontSize={"large"}/>
                </IconButton>
            </Box>
            <Paper elevation={3} sx={{padding: 4, mt: 8, textAlign: "center"}}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="success.main">{success}</Typography>}
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={passwordHash}
                    onChange={(e) => setPasswordHash(e.target.value)}
                />

                <FormControlLabel
                    control={<Checkbox color="primary" checked={remember}
                                       onChange={(event, checked) => setRemember(checked)}/>}
                    label="Remember me"
                />
                {loading? <Loading large={false}/> : null}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{mt: 2, mb: 1}}
                    onClick={handleLogin}
                >
                    Login
                </Button>

                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Link component="button" onClick={() => navigate("/")}>Forgot password?</Link>
                    <Link  component="button" onClick={() => navigate("/signup")}>Sign up</Link>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
