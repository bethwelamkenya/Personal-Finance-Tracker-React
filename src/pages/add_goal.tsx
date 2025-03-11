import React, {useState} from "react";
import {
    TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import axios from "axios";
import {User} from "../classes/user";
import {BankAccount} from "../classes/bank_account";
import {Loading} from "../global_ui_components/loading";

interface AddSavingsGoalProps {
    user: User
    accounts: BankAccount[];  // List of account numbers passed as a prop
    onGoalCreated: () => void
}

const AddSavingsGoal = ({user, accounts, onGoalCreated}: AddSavingsGoalProps) => {
    const [goalName, setGoalName] = useState("");
    const [accountNumber, setAccountNumber] = useState(accounts[0].accountNumber);
    const [targetAmount, setTargetAmount] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!goalName || !accountNumber || !targetAmount) {
            setError("All fields are required.");
            return;
        }

        setError("");
        setSuccess("");
        setLoading(true)

        try {
            await axios.post(`http://localhost:8080/savings_goals/${user.id}`, {
                accountNumber,
                goalName,
                targetAmount: parseFloat(targetAmount),
                currency,
                savedAmount: 0,  // Initially zero
                createdAt: new Date(),
                userEmail: user.id // Replace with actual user email from context
            });

            setSuccess(`Savings goal added. Redirecting...`);
            setError('')
            onGoalCreated(); // Redirect after success
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            setSuccess('')
            setError(err.response.data.error || "Failed to add savings goal");
            console.error("Error adding savings goal:", err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 5, p: 3, border: "1px solid #ddd", borderRadius: "8px", boxShadow: 3}}>
                <Typography variant="h5" gutterBottom>
                    Add Savings Goal
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="success.main">{success}</Typography>}
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Account Number</InputLabel>
                        <Select
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            required
                        >
                            {accounts.map((acc) => (
                                <MenuItem key={acc.id} value={acc.accountNumber}>{acc.accountNumber}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Goal Name"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Target Amount"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        margin="normal"
                        required
                        type="number"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Currency</InputLabel>
                        <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                            <MenuItem value="KES">KES</MenuItem>
                        </Select>
                    </FormControl>
                    {loading ? (<Loading large={false}/>) : null}
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}}>
                        Add Savings Goal
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AddSavingsGoal;
