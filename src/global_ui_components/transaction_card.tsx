import { Card, CardContent, Typography } from "@mui/material";
import {Transaction} from "../classes/transaction";

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{transaction.type}</Typography>
                <Typography>Amount: {transaction.amount} {transaction.currency}</Typography>
                <Typography>Date: {new Date(transaction.timestamp).toLocaleString()}</Typography>
            </CardContent>
        </Card>
    );
};

export default TransactionCard;
