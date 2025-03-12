import { Card, CardContent, Typography } from "@mui/material";
import {SavingsGoal} from "../classes/savings_goal";

const SavingsGoalCard = ({ goal }: { goal: SavingsGoal }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{goal.goalName}</Typography>
                <Typography>Target: {goal.targetAmount} {goal.currency}</Typography>
                <Typography>Saved: {goal.savedAmount} {goal.currency}</Typography>
            </CardContent>
        </Card>
    );
};

export default SavingsGoalCard;
