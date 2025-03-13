import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    Container,
    Typography,
    Box,
    Tab,
    Tabs,
    Grid,
    Card,
    CardContent,
    Avatar, LinearProgress, Chip, IconButton
} from "@mui/material";
import {BankAccount} from "../classes/bank_account";
import {SavingsGoal} from "../classes/savings_goal";
import {Transaction} from "../classes/transaction";
import {AccountBalance, ArrowBack, AttachMoney, CreditCard, ListAlt, Savings} from "@mui/icons-material";

interface BankAccountDetailsProps {
    savingsGoals: SavingsGoal[]
    transactions: Transaction[]
}

const BankAccountDetails: React.FC<BankAccountDetailsProps> = ({savingsGoals, transactions}) => {
    const navigate = useNavigate()
    const location = useLocation();
    const [account] = useState<BankAccount | null>(location.state?.account || null);

    const [tabValue, setTabValue] = useState(0);

    if (!account){
        return (
            <Typography>An Error Occurred</Typography>
        )
    }
    const filteredGoals = savingsGoals.filter(
        goal => goal.accountNumber === account.accountNumber
    );

    const filteredTransactions = transactions.filter(
        t => t.accountNumber === account.accountNumber || t.targetAccountNumber === account.accountNumber
    );

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            <Box display="flex" justifyContent="flex-start">
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBack fontSize={"large"}/>
                </IconButton>
            </Box>
            {account ? (
                <>
                    {/* Account Overview */}
                    <Card sx={{mb: 4, borderLeft: `4px solid #2196f3`}}>
                        <CardContent>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item xs={12} md={8}>
                                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                        <Avatar sx={{bgcolor: 'primary.main', mr: 2}}>
                                            <AccountBalance/>
                                        </Avatar>
                                        <div>
                                            <Typography variant="h4">{account.bankName}</Typography>
                                            <Typography variant="body1" color="text.secondary">
                                                {account.accountNumber}
                                            </Typography>
                                        </div>
                                    </Box>

                                    <Grid container spacing={2}>
                                        <Grid item xs={6} md={3}>
                                            <Typography variant="body2" color="text.secondary">
                                                Balance
                                            </Typography>
                                            <Typography variant="h5">
                                                {new Intl.NumberFormat(undefined, {
                                                    style: 'currency',
                                                    currency: account.currency
                                                }).format(account.balance)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} md={3}>
                                            <Typography variant="body2" color="text.secondary">
                                                Holder
                                            </Typography>
                                            <Typography variant="body1">
                                                {account.holderName}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} md={3}>
                                            <Typography variant="body2" color="text.secondary">
                                                Created
                                            </Typography>
                                            <Typography variant="body1">
                                                {new Date(account.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} md={3}>
                                            <Typography variant="body2" color="text.secondary">
                                                Currency
                                            </Typography>
                                            <Chip label={account.currency} variant="outlined"/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Tabs Section */}
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                            <Tab label={
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <Savings/> Savings Goals ({filteredGoals.length})
                                </Box>
                            }/>
                            <Tab label={
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <ListAlt/> Transactions ({filteredTransactions.length})
                                </Box>
                            }/>
                        </Tabs>
                    </Box>

                    {/* Tab Content */}
                    <Box sx={{pt: 3}}>
                        {tabValue === 0 && (
                            <Grid container spacing={3}>
                                {filteredGoals.map((goal) => (
                                    <Grid item xs={12} md={6} key={goal.id}>
                                        <Card sx={{height: '100%'}}>
                                            <CardContent>
                                                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                                    <Avatar sx={{bgcolor: 'secondary.main', mr: 2}}>
                                                        <Savings/>
                                                    </Avatar>
                                                    <Typography variant="h6">{goal.goalName}</Typography>
                                                </Box>

                                                <LinearProgress
                                                    variant="determinate"
                                                    value={(goal.savedAmount / goal.targetAmount) * 100}
                                                    sx={{height: 8, mb: 2}}
                                                />

                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body2">
                                                            Saved: {new Intl.NumberFormat(undefined, {
                                                            style: 'currency',
                                                            currency: goal.currency
                                                        }).format(goal.savedAmount)}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Target: {new Intl.NumberFormat(undefined, {
                                                            style: 'currency',
                                                            currency: goal.currency
                                                        }).format(goal.targetAmount)}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="caption" color="text.secondary">
                                                            Created: {new Date(goal.createdAt).toLocaleDateString()}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}

                        {tabValue === 1 && (
                            <Box sx={{maxHeight: '60vh', overflow: 'auto'}}>
                                {filteredTransactions.map((transaction) => (
                                    <Card key={transaction.id} sx={{mb: 2}}>
                                        <CardContent>
                                            <Grid container alignItems="center" spacing={2}>
                                                <Grid item xs={12} md={8}>
                                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                                        <Avatar sx={{
                                                            bgcolor: transaction.type.includes('WITHDRAW') ? '#ef5350' : '#4caf50',
                                                            color: 'white'
                                                        }}>
                                                            {transaction.type.includes('TRANSFER') ? (
                                                                <CreditCard/>
                                                            ) : (
                                                                <AttachMoney/>
                                                            )}
                                                        </Avatar>
                                                        <div>
                                                            <Typography variant="body1">
                                                                {transaction.type}
                                                            </Typography>
                                                            {/*<Typography variant="body2" color="text.secondary">*/}
                                                            {/*    {transaction.description}*/}
                                                            {/*</Typography>*/}
                                                        </div>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <Box sx={{textAlign: 'right'}}>
                                                        <Typography variant="body1" sx={{
                                                            color: transaction.type.includes('WITHDRAW') ? '#ef5350' : '#4caf50',
                                                            fontWeight: 600
                                                        }}>
                                                            {transaction.type.includes('WITHDRAW') ? '-' : '+'}
                                                            {new Intl.NumberFormat(undefined, {
                                                                style: 'currency',
                                                                currency: transaction.currency
                                                            }).format(transaction.amount)}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {new Date(transaction.timestamp).toLocaleString()}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        )}
                    </Box>
                </>) : (
                <Typography>An Error Occurred</Typography>
            )}
        </Container>
    );
};

export default BankAccountDetails;
