import React from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@mui/material";

interface PopupDialogProps {
    open: boolean;
    title: string;
    children: React.ReactNode;
    fullWidth?: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}

const PopupDialog: React.FC<PopupDialogProps> = (
    {
        open,
        title,
        children,
        fullWidth = false,
        onClose,
        onConfirm,
        confirmText = "Confirm",
        cancelText = "Cancel",
    }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth={fullWidth}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    {cancelText}
                </Button>
                {onConfirm && (
                    <Button onClick={onConfirm} color="primary">
                        {confirmText}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default PopupDialog;
