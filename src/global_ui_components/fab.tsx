import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SavingsIcon from "@mui/icons-material/Savings";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function FloatingMenu() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const actions = [
        {icon: <AccountBalanceIcon/>, name: "Add Bank Account", onClick: () => navigate("/add_account")},
        {icon: <SavingsIcon/>, name: "Add Savings Goal", onClick: () => navigate("/add_goal")},
        {icon: <AttachMoneyIcon/>, name: "Add Transaction", onClick: () => navigate("/create_transaction")},
    ];

    return (
        <SpeedDial
            ariaLabel="Floating Action Button"
            sx={{position: "fixed", bottom: 16, right: 16, zIndex: 999}}
            icon={<SpeedDialIcon openIcon={<AddIcon/>}/>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            {actions.map((action) => (
                <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name}
                                 onClick={action.onClick}/>
            ))}
        </SpeedDial>
    );
}
