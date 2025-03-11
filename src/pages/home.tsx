import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
    Container,
    Typography,
    Button,
    Box,
    Grid,
    Card,
    CardContent,
    Avatar,
    Divider,
    Chip,
    LinearProgress, Stack
} from "@mui/material";
import {User} from "../classes/user";
import {BankAccount} from "../classes/bank_account";
import {
    AccountBalance, ArrowDownward, ArrowUpward,
    AttachMoney,
    DateRange,
    Email,
    MonetizationOn,
    Person,
    Savings,
    Schedule, SwapHoriz
} from "@mui/icons-material";
import {SavingsGoal} from "../classes/savings_goal";
import {Transaction} from "../classes/transaction";
import {Loading} from "../global_ui_components/loading";

interface HomeProps {
    user: User
    accounts: BankAccount[]
    savings: SavingsGoal[]
    transactions: Transaction[]
    loadingAccounts: boolean
    loadingSavings: boolean
    loadingTransactions: boolean
}

const HomePage: React.FC<HomeProps> = (
    {
        user,
        accounts,
        savings,
        transactions,
        loadingAccounts,
        loadingSavings,
        loadingTransactions
    }) => {
    const navigate = useNavigate()
    const getTransactionIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'deposit':
                return <ArrowDownward/>;
            case 'withdraw':
                return <ArrowUpward/>;
            case 'transfer':
                return <SwapHoriz/>;
            default:
                return <AccountBalance/>;
        }
    };

    const getAmountColor = (type: string) => {
        return type.toLowerCase().includes("withdraw") || type.toLowerCase().includes("in") ? '#ef5350' : '#4caf50';
    };
    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            <Typography variant="h4" gutterBottom sx={{
                fontWeight: 600,
                mb: 4,
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>Welcome to BeKa Personal Finance Tracker</Typography>
            <Typography>{user.name}</Typography>
            <Typography>{user.email}</Typography>

            <Typography variant="h4" gutterBottom sx={{
                fontWeight: 600,
                mb: 4,
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <AccountBalance fontSize="large"/>
                Bank Accounts
            </Typography>
            {loadingAccounts ? (
                <Loading/>
            ) : (
                <Grid container spacing={3}>
                    {accounts.map((account) => (
                        <Grid item xs={12} sm={6} md={4} key={account.id}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderLeft: `4px solid ${account.balance > 0 ? 'var(--success-color)' : 'var(--warning-color)'}`,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)'
                                }
                            }}>
                                <CardContent sx={{flexGrow: 1}}>
                                    {/* Bank Header */}
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2,
                                        backgroundColor: 'var(--translucent-primary-color)',
                                        p: 1,
                                        borderRadius: 1
                                    }}>
                                        <Avatar sx={{bgcolor: 'primary.main', mr: 2}}>
                                            {account.bankName[0]}
                                        </Avatar>
                                        <div>
                                            <Typography variant="h6">{account.bankName}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {account.accountNumber}
                                            </Typography>
                                        </div>
                                    </Box>

                                    {/* Account Details */}
                                    <Box sx={{mb: 2}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                                            <Person sx={{mr: 1, color: 'text.secondary'}}/>
                                            <Typography variant="body1">{account.holderName}</Typography>
                                        </Box>

                                        <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                                            <AttachMoney sx={{mr: 1, color: 'text.secondary'}}/>
                                            <Typography variant="h6" sx={{fontWeight: 600}}>
                                                {new Intl.NumberFormat(undefined, {
                                                    style: 'currency',
                                                    currency: account.currency
                                                }).format(account.balance)}
                                            </Typography>
                                        </Box>

                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                            <DateRange sx={{color: 'text.secondary'}}/>
                                            <Typography variant="body2">
                                                Created: {new Date(account.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Divider sx={{my: 2}}/>

                                    {/* Footer */}
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Chip
                                            label={account.currency}
                                            variant="outlined"
                                            size="small"
                                            color="primary"
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Typography variant="h4" gutterBottom sx={{
                fontWeight: 600,
                mb: 4,
                marginTop: "20px",
                color: 'secondary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <Savings fontSize="large"/>
                Savings Goals
            </Typography>

            {loadingSavings ? (
                <Loading/>
            ) : (
                <Grid container spacing={3}>
                    {savings.map((goal) => {
                        const progress = (goal.savedAmount / goal.targetAmount) * 100;

                        return (
                            <Grid item xs={12} sm={6} md={4} key={goal.id}>
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderLeft: `4px solid ${progress >= 100 ? '#4caf50' : '#2196f3'}`,
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)'
                                    }
                                }}>
                                    <CardContent sx={{flexGrow: 1}}>
                                        {/* Goal Header */}
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mb: 2,
                                            backgroundColor: 'var(--translucent-primary-color)',
                                            p: 1,
                                            borderRadius: 1
                                        }}>
                                            <Avatar sx={{bgcolor: 'secondary.main', mr: 2}}>
                                                <MonetizationOn/>
                                            </Avatar>
                                            <div>
                                                <Typography variant="h6">{goal.goalName}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Account: {goal.accountNumber}
                                                </Typography>
                                            </div>
                                        </Box>

                                        {/* Progress Section */}
                                        <Box sx={{mb: 2}}>
                                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Progress ({Math.round(progress)}%)
                                                </Typography>
                                                <Chip
                                                    label={goal.currency}
                                                    size="small"
                                                    variant="outlined"
                                                    color="secondary"
                                                />
                                            </Box>

                                            <LinearProgress
                                                variant="determinate"
                                                value={Math.min(progress, 100)}
                                                sx={{
                                                    height: 10,
                                                    borderRadius: 5,
                                                    backgroundColor: '#e0e0e0',
                                                    '& .MuiLinearProgress-bar': {
                                                        borderRadius: 5,
                                                        backgroundColor: progress >= 100 ? '#4caf50' : '#2196f3'
                                                    }
                                                }}
                                            />

                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mt: 1.5,
                                                mb: 2
                                            }}>
                                                <Typography variant="body2">
                                                    Saved: {new Intl.NumberFormat(undefined, {
                                                    style: 'currency',
                                                    currency: goal.currency
                                                }).format(goal.savedAmount)}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Target: {new Intl.NumberFormat(undefined, {
                                                    style: 'currency',
                                                    currency: goal.currency
                                                }).format(goal.targetAmount)}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Divider sx={{my: 2}}/>

                                        {/* Footer */}
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <DateRange fontSize="small" color="action"/>
                                                <Typography variant="caption">
                                                    {new Date(goal.createdAt).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}

            <Typography variant="h4" gutterBottom sx={{
                fontWeight: 600,
                mb: 4,
                marginTop: "20px",
                color: 'secondary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <AccountBalance fontSize="large"/>
                Transaction History
            </Typography>

            <Button onClick={() => navigate("/create_transaction")} variant={"outlined"}>Create Transaction</Button>

            {loadingTransactions ? (<Loading/>) : (
                <Grid container spacing={3}>
                    {transactions.map((transaction) => (
                        <Grid item xs={12} key={transaction.id}>
                            <Card sx={{
                                borderLeft: `4px solid ${getAmountColor(transaction.type)}`,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateX(4px)'
                                }
                            }}>
                                <CardContent>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Avatar sx={{
                                            bgcolor: getAmountColor(transaction.type),
                                            color: 'white'
                                        }}>
                                            {getTransactionIcon(transaction.type)}
                                        </Avatar>

                                        <Box sx={{flexGrow: 1}}>
                                            {/* Main Transaction Info */}
                                            <Stack direction="row" justifyContent="space-between">
                                                <div>
                                                    <Typography variant="h6">
                                                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                                    </Typography>
                                                    {transaction.goalName && (
                                                        <Typography variant="body2" color="text.secondary">
                                                            Goal: {transaction.goalName}
                                                        </Typography>
                                                    )}
                                                </div>

                                                <Typography variant="h6" sx={{
                                                    color: getAmountColor(transaction.type),
                                                    fontWeight: 600
                                                }}>
                                                    {transaction.type.toLowerCase() === 'withdrawal' ? '-' : '+'}
                                                    {new Intl.NumberFormat(undefined, {
                                                        style: 'currency',
                                                        currency: transaction.currency
                                                    }).format(transaction.amount)}
                                                </Typography>
                                            </Stack>

                                            {/* Transfer Details */}
                                            {transaction.targetAccountNumber && (
                                                <Box sx={{
                                                    mt: 2,
                                                    p: 2,
                                                    bgcolor: 'action.hover',
                                                    borderRadius: 1
                                                }}>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <Savings color="action"/>
                                                        <div>
                                                            <Typography variant="body2">
                                                                To: {transaction.targetGoalName || 'General Account'}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Account: {transaction.targetAccountNumber}
                                                            </Typography>
                                                            {transaction.targetUserEmail && (
                                                                <Typography variant="caption" display="block"
                                                                            color="text.secondary">
                                                                    <Email
                                                                        fontSize="inherit"/> {transaction.targetUserEmail}
                                                                </Typography>
                                                            )}
                                                        </div>
                                                    </Stack>
                                                </Box>
                                            )}

                                            {/* Metadata */}
                                            <Stack direction="row" spacing={2} sx={{mt: 2}} alignItems="center">
                                                <Chip
                                                    icon={<Schedule/>}
                                                    label={new Date(transaction.timestamp).toLocaleString()}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default HomePage;
