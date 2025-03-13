import React, {useState} from "react";
import {
    Container,
    TextField,
    MenuItem,
    Select,
    Button,
    FormControl,
    InputLabel,
    Typography,
    Box, IconButton,
} from "@mui/material";
import axios from "axios";
import {BankAccount} from "../classes/bank_account";
import {SavingsGoal} from "../classes/savings_goal";
import {TransactionType} from "../classes/transaction_type";
import {Transaction} from "../classes/transaction";
import {Loading} from "../global_ui_components/loading";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth_provider";

// Props interface
interface Props {
    bankAccounts: BankAccount[];
    savingsGoals: SavingsGoal[];
}

const TransactionForm: React.FC<Props> = ({bankAccounts, savingsGoals}) => {
    const types = [
        "DEPOSIT",
        "WITHDRAW",
        "TRANSFER_OUT",
        "TRANSFER_OUT_TO",
        "DEPOSIT_GOAL",
        "WITHDRAW_GOAL",
        "TRANSFER_GOAL_OUT",
        "TRANSFER_GOAL_OUT_TO",
    ]
    const navigate = useNavigate()
    const {user, setLoading, server} = useAuth()
    const [loadingPost, setLoadingPost] = useState(false)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [sourceType, setSourceType] = useState<"bank" | "savings">("bank");
    const [sourceId, setSourceId] = useState<string>("");
    const [transactionType, setTransactionType] = useState<TransactionType>(
        TransactionType.DEPOSIT
    );
    const [amount, setAmount] = useState<number>(0);
    const [targetAccountNumber, setTargetAccountNumber] = useState<string>("");
    const [targetGoalName, setTargetGoalName] = useState<string>("");
    const [targetUserEmail, setTargetUserEmail] = useState<string>("");

    const handleSubmit = async () => {
        if (!sourceId || amount <= 0) {
            setError("Please fill all required fields.");
            return;
        }
        setError("");
        setSuccess("");
        setLoadingPost(true)
        try {
            const response = await axios.post(
                `${server}/transactions/create/${user.id}`, // Replace userId
                {
                    accountNumber: sourceId,
                    type: transactionType,
                    amount: amount,
                    targetAccountNumber: targetAccountNumber || "",
                    targetGoalName: targetGoalName || "",
                    targetUserEmail: targetUserEmail || "",
                    currency: "USD",
                    timestamp: new Date().toISOString(),
                    userEmail: user.id, // Ensure userId is correct
                }
            );
            const transaction = Transaction.fromJson(response.data)
            setSuccess(`Transaction created successfully with id: ${transaction.id}. Redirecting...`);
            setError('')
            setTimeout(() => navigate("/home"), 2000);
            setLoading(true)
            setLoadingPost(false)
        } catch (err: any) {
            setLoadingPost(false)
            console.log(err)
            setSuccess('')
            setError(err.response.data.error || "Login failed!");
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
                    Create Transaction
                </Typography>

                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="success.main">{success}</Typography>}

                {/* Select Source Type */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Source Type</InputLabel>
                    <Select value={sourceType} onChange={(e) => setSourceType(e.target.value as any)}>
                        <MenuItem value="bank">Bank Account</MenuItem>
                        <MenuItem value="savings">Savings Goal</MenuItem>
                    </Select>
                </FormControl>

                {/* Select Source Account */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Source Account</InputLabel>
                    <Select value={sourceId} onChange={(e) => {
                        setSourceId(e.target.value)
                        // setSourceEmailId(e.target.value)
                    }}>
                        {(sourceType === "bank" ? bankAccounts : savingsGoals).map((item) => (
                            <MenuItem key={item.id} value={item.accountNumber}>
                                {item.accountNumber} - {"goalName" in item ? item.goalName : item.holderName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Select Transaction Type */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Transaction Type</InputLabel>
                    <Select value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value as TransactionType)}>
                        {types.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type.replace("_", " ")}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Amount */}
                <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    margin="normal"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                />

                {/* Target Account (if needed) */}
                {transactionType.includes("TRANSFER") && (
                    <TextField
                        fullWidth
                        label="Target Account Number"
                        margin="normal"
                        value={targetAccountNumber}
                        onChange={(e) => setTargetAccountNumber(e.target.value)}
                    />
                )}

                {/* Target Goal (if needed) */}
                {transactionType.includes("GOAL") && (
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Target Savings Goal</InputLabel>
                        <Select value={targetGoalName} onChange={(e) => setTargetGoalName(e.target.value)}>
                            {savingsGoals.map((goal) => (
                                <MenuItem key={goal.id} value={goal.goalName}>
                                    {goal.goalName} - {goal.currency} {goal.targetAmount}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {/* Target User Email (for external transfers) */}
                {transactionType.includes("TO") && (
                    <TextField
                        fullWidth
                        label="Target User Email"
                        margin="normal"
                        value={targetUserEmail}
                        onChange={(e) => setTargetUserEmail(e.target.value)}
                    />
                )}
                {loadingPost ? (<Loading large={false}/>) : null}
                {/* Submit Button */}
                <Button fullWidth variant="contained" color="primary" sx={{mt: 3}} onClick={handleSubmit}>
                    Submit Transaction
                </Button>
            </Box>
        </Container>
    );
};

export default TransactionForm;
