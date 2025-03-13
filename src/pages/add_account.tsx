import React, {useState} from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton
} from "@mui/material";
import axios from "axios";
import {User} from "../classes/user";
import {CurrencyType} from "../classes/currency_type";
import {Loading} from "../global_ui_components/loading";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth_provider";

const AddBankAccount: React.FC = () => {
    const navigate = useNavigate()
    const {user, server, setLoading} = useAuth()
    const [currency, setCurrency] = useState(CurrencyType.USD.code);
    const [holderName, setHolderName] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [balance, setBalance] = useState("");
    const [loadingPost, setLoadingPost] = useState(false)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!bankName || !accountNumber || !balance || !holderName) {
            setError("All fields are required.");
            return;
        }
        setError("");
        setSuccess("");
        setLoadingPost(true)

        try {
            await axios.post(`${server}/bank_accounts/${user.id}`, {
                bankName: bankName,
                accountNumber: accountNumber,
                holderName: holderName,
                balance: parseFloat(balance),
                currency: currency,
                userEmail: user.id
            });
            setSuccess(`Bank account added. Redirecting...`);
            setError('')
            setTimeout(() => navigate("/home"), 2000);
            setLoading(true)
            setLoadingPost(false)
        } catch (err: any) {
            setLoadingPost(false)
            console.error("Error adding bank account:", err);
            setSuccess('')
            setError(err.response.data.error || "Failed to add bank account");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="flex-start">
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBack fontSize={"large"}/>
                </IconButton>
            </Box>
            <Box sx={{mt: 5, p: 3, border: "1px solid var(--border-color)", borderRadius: "8px", boxShadow: 3}}>
                <Typography variant="h5" gutterBottom>
                    Add Bank Account
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="success.main">{success}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Holder Name"
                        value={holderName}
                        onChange={(e) => setHolderName(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Bank Name"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Initial Balance"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        margin="normal"
                        required
                        type="number"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Transaction Type</InputLabel>
                        <Select value={currency}
                                onChange={(e) => setCurrency(e.target.value)}>
                            {Object.values(CurrencyType).map((type: CurrencyType) => (
                                <MenuItem key={type.code} value={type.code}>
                                    {type.code}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {loadingPost ? (<Loading large={false}/>) : null}
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}}>
                        Add Account
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AddBankAccount;
