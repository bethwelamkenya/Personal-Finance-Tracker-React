import React, {useEffect, useState} from 'react';
import './styles/App.css';
import {Theme} from "./classes/theme";
import {Box} from "@mui/material";
import TopAppBar from "./global_ui_components/top_app_bar";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Footer from "./global_ui_components/footer";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import {Route, BrowserRouter as Router, Routes, useNavigate, useLocation} from "react-router-dom";
import HomePage from "./pages/home";
import LandingPage from "./pages/landing";
import NotFound from "./pages/not_found";
import {User} from "./classes/user";
import axios from 'axios';
import {BankAccount} from "./classes/bank_account";
import {SavingsGoal} from "./classes/savings_goal";
import {Transaction} from "./classes/transaction";
import TransactionForm from "./pages/create_transaction";
import FloatingMenu from "./global_ui_components/fab";
import AddBankAccount from "./pages/add_account";
import AddSavingsGoal from "./pages/add_goal";
import BankAccountDetails from "./pages/account_details";

const useMuiTheme = (theme: Theme) => {
    const [muiTheme, setMuiTheme] = useState(createMuiTheme(theme));

    useEffect(() => {
        setMuiTheme(createMuiTheme(theme));
    }, [theme]);

    return muiTheme;
};

const createMuiTheme = (theme: Theme) => {
    const styles = getComputedStyle(document.body);

    return createTheme({
        palette: {
            mode: theme === "dark" || theme === "amoled" ? "dark" : "light",
            primary: {main: styles.getPropertyValue("--primary-color").trim()},
            secondary: {main: styles.getPropertyValue("--secondary-color").trim()},
            background: {
                default: styles.getPropertyValue("--bg-color").trim(),
                paper: styles.getPropertyValue("--bg-color").trim()
            },
            text: {primary: styles.getPropertyValue("--text-color").trim()},
        },
    });
};

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [theme, setTheme] = useState(
        (localStorage.getItem("theme") as Theme) || Theme.LIGHT
    );

    const [muiTheme, setMuiTheme] = useState(useMuiTheme(theme));
    const storedUser = localStorage.getItem("user")
    const [user, setUser] = useState(User.fromJson(storedUser ? JSON.parse(storedUser) : ""))
    const [accounts, setAccounts] = useState([])
    const [savings, setSavings] = useState([])
    const [transactions, setTransactions] = useState([])
    const [loadingAccounts, setLoadingAccounts] = useState(false)
    const [loadingSavings, setLoadingSavings] = useState(false)
    const [loadingTransactions, setLoadingTransactions] = useState(false)
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        const excludedRoutes = ["/login", "/signup"];

        if (!user && !excludedRoutes.includes(location.pathname)) {
            navigate("/");
        } else if (user && refresh) {
            const fetchDataSequentially = async () => {
                try {
                    setLoadingAccounts(true)
                    ;
                    const accountsResponse = await axios.get(`http://localhost:8080/bank_accounts/email/${user.id}`);
                    setAccounts(accountsResponse.data.map((account: any) => (
                        BankAccount.fromJson(account)
                    )));
                    setLoadingAccounts(false);

                    setLoadingSavings(true);
                    const savingsResponse = await axios.get(`http://localhost:8080/savings_goals/email/${user.id}`);
                    setSavings(savingsResponse.data.map((saving: any) => (
                        SavingsGoal.fromJson(saving)
                    )));
                    setLoadingSavings(false);

                    setLoadingTransactions(true);
                    const transactionsResponse = await axios.get(`http://localhost:8080/transactions/email/${user.id}`);
                    setTransactions(transactionsResponse.data.map((transaction: any) => (
                        Transaction.fromJson(transaction)
                    )));
                    setLoadingTransactions(false);
                } catch
                    (error) {
                    console.error("Error fetching data:", error);
                    setLoadingAccounts(false);
                    setLoadingSavings(false);
                    setLoadingTransactions(false);
                }
            };
            fetchDataSequentially().then(() => {
                setRefresh(false)
            });
        }
    }, [location.pathname, navigate, refresh, user]);


    const onUserChanged = (user: User | null) => {
        setUser(user)
        setRefresh(true)
    }

    useEffect(() => {
        // Remove existing theme classes
        document.body.classList.forEach((cls) => {
            if (Object.values(Theme).includes(cls as Theme)) {
                document.body.classList.remove(cls);
            }
        });

        // Apply the new theme
        document.body.classList.add(theme);

        // Delay to ensure styles are applied before MUI picks them up
        setTimeout(() => {
            setMuiTheme(createMuiTheme(theme));
        }, 10);
    }, [theme]);
    return (
        <ThemeProvider theme={muiTheme}>
            <Box display="flex" flexDirection="column" minHeight="100vh">
                {/* Your header/navigation */}
                <TopAppBar theme={theme} user={user} setTheme={setTheme} title={"Personal Finance Tracker"}
                           menuItems={[
                               {label: "Home", icon: "Home", onClick: () => alert("Home Clicked")},
                               {label: "Profile", icon: "AccountCircle", onClick: () => alert("Profile Clicked")},
                               {label: "LogOut", icon: "Logout", onClick: () => alert("LogOut Clicked")}
                           ]}/>

                <Box component="main" sx={{flexGrow: 1}}>
                    <Routes>
                        {user ? (
                            <>
                                <Route path="/home" element={
                                    <HomePage user={user} accounts={accounts} savings={savings}
                                              transactions={transactions}
                                              loadingAccounts={loadingAccounts}
                                              loadingSavings={loadingSavings}
                                              loadingTransactions={loadingTransactions}
                                              refreshData={() => setRefresh(true)}/>}/>
                                <Route path={"/create_transaction"} element={
                                    <TransactionForm user={user} bankAccounts={accounts}
                                                     savingsGoals={savings}
                                                     onTransactionCreated={() => {
                                                         setTimeout(() => navigate("/home"), 2000);
                                                         setRefresh(true)
                                                     }}/>}/>
                                <Route path={"/add_account"} element={
                                    <AddBankAccount user={user}
                                                    onAccountCreated={() => {
                                                        setTimeout(() => navigate("/home"), 2000);
                                                        setRefresh(true)
                                                    }}/>
                                }/>
                                <Route path={"/add_goal"} element={
                                    <AddSavingsGoal user={user} accounts={accounts}
                                    onGoalCreated={() => {
                                        setTimeout(() => navigate("/home"), 2000);
                                        setRefresh(true)
                                    }}/>
                                }/>
                                <Route path={"/bank-accounts/:accountNumber"} element={
                                    <BankAccountDetails user={user} savingsGoals={savings} transactions={transactions}/>
                                }/>
                            </>
                        ) : null}
                        <Route path="/" element={<LandingPage/>}/> {/* New Landing Page */}
                        <Route path="/login" element={<LoginPage onUserLoggedIn={onUserChanged}/>}/>
                        <Route path="/signup" element={<SignupPage onUserSignUp={onUserChanged}/>}/>
                        <Route path="*" element={<NotFound/>}/> {/* Redirect unknown routes */}
                    </Routes>
                    <FloatingMenu/>
                </Box>

                <Footer/>
            </Box>
        </ThemeProvider>
    );
};

const AppRouter = () => {
    return (
        <Router>
            <App/>
        </Router>
    )
}

export default AppRouter;
