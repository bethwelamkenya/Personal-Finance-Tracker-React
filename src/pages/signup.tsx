import React, {useState} from "react";
import {
    Container, TextField, Button, Checkbox, FormControlLabel, Typography,
    Box, Paper, Link, Alert, IconButton
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import axios from "axios";
import {User} from "../classes/user";
import {Loading} from "../global_ui_components/loading";

interface SignupProps {
    onUserSignUp: (user: User | null) => void
}

const SignupPage: React.FC<SignupProps> = ({onUserSignUp}) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        passwordHash: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    const [errors, setErrors] = useState({
        email: "",
        passwordHash: "",
        confirmPassword: "",
        termsAccepted: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false)

    // Password validation function
    const validatePassword = (password: string) => {
        return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSignup = async () => {
        let newErrors = {email: "", passwordHash: "", confirmPassword: "", termsAccepted: ""};

        if (!formData.email.includes("@")) {
            newErrors.email = "Invalid email address";
        }
        if (!validatePassword(formData.passwordHash)) {
            newErrors.passwordHash = "Password must be at least 8 characters, 1 uppercase, and 1 number";
        }
        if (formData.passwordHash !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (!formData.termsAccepted) {
            newErrors.termsAccepted = "You must accept the terms";
        }

        setErrors(newErrors);
        setError("");
        setSuccess("");
        setLoading(true)
        if (!Object.values(newErrors).some((error) => error)) {

            try {
                const response = await axios.post("http://localhost:8080/users/signup", {
                    ...formData
                });

                const user = User.fromJson(response.data)
                localStorage.setItem("user", JSON.stringify(user)); // Assuming backend returns a JWT
                onUserSignUp(User.fromJson(response.data))
                setSuccess("Account created successfully! Redirecting...");
                setTimeout(() => navigate("/home"), 2000);
                setLoading(false)
            } catch (err: any) {
                setLoading(false)
                setError(err.response.data.error || "Signup failed!");
            }
        }
    };

    return (
        <Container maxWidth="xs">
            <Box display="flex" justifyContent="flex-start">
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBack fontSize={"large"}/>
                </IconButton>
            </Box>
            <Paper elevation={3} sx={{padding: 4, mt: 6, textAlign: "center"}}>
                <Typography variant="h5" gutterBottom>Sign Up</Typography>

                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="success.main">{success}</Typography>}
                <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    variant="outlined"
                    margin="normal"
                    value={formData.name}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    variant="outlined"
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />

                <TextField
                    fullWidth
                    label="Password"
                    name="passwordHash"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={formData.passwordHash}
                    onChange={handleChange}
                    error={!!errors.passwordHash}
                    helperText={errors.passwordHash}
                />

                <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                />

                <FormControlLabel
                    control={<Checkbox name="termsAccepted" color="primary" checked={formData.termsAccepted}
                                       onChange={handleChange}/>}
                    label="I agree to the Terms & Conditions"
                />
                {errors.termsAccepted && <Alert severity="error">{errors.termsAccepted}</Alert>}

                {loading? <Loading large={false}/> : null}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{mt: 2}}
                    onClick={handleSignup}
                >
                    Sign Up
                </Button>

                <Box mt={2}>
                    <Typography variant="body2">
                        Already have an account? <Link component="button" onClick={() => navigate("/login")}>Log
                        in</Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignupPage;
