import React, {Fragment, useState} from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    RadioGroup,
    FormControlLabel,
    Radio, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Theme, isValidTheme} from "../classes/theme";
import {AccountCircle, Home, Palette} from "@mui/icons-material";
import PopupDialog from "./pupup_dialog";
import Icon from "./icon";
import * as MaterialIcons from "@mui/icons-material";
import {User} from "../classes/user";
import {useNavigate} from "react-router-dom"; // Your Theme Enum

interface CustomMenuItem {
    label: string
    icon?: keyof typeof MaterialIcons
    onClick: () => void
}

interface TopAppBarProps {
    title: string
    user?: User | null
    theme: Theme;
    setTheme: (theme: Theme) => void;
    menuItems?: CustomMenuItem[]
}

const TopAppBar: React.FC<TopAppBarProps> = ({title, user, theme, setTheme, menuItems = []}) => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openThemingDialogue, setOpenThemingDialogue] = useState(false); // Controls the dialog visibility
    const [drawerOpen, setDrawerOpen] = useState(false)
    // const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget)
    // }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open)
    }

    const handleChangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedTheme = event.target.value as Theme;
        if (isValidTheme(selectedTheme)) {
            localStorage.setItem("theme", selectedTheme);
            setTheme(selectedTheme);
        }
    };

    return (
        <>
            <AppBar position="sticky" color={"inherit"}>
                <Toolbar>
                    {/* Menu Button (Optional) */}
                    <IconButton edge="start" color={'inherit'} aria-label="menu" onClick={() => toggleDrawer(true)}>
                        {/*<IconButton edge="start" color={'inherit'} aria-label="menu" onClick={handleMenuOpen}>*/}
                        {/*    <Icon name={"Menu"} size={40}/>*/}
                        <MenuIcon fontSize={'large'}/>
                    </IconButton>

                    {/* Title */}
                    <Typography variant="h6" sx={{flexGrow: 1}} textAlign={"start"} color={"primary"} onClick={() => navigate("/home")}>
                        {title}
                    </Typography>

                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        {menuItems.map((item, index) => (
                            <MenuItem key={index} onClick={() => {
                                item.onClick()
                                handleMenuClose()
                            }}>
                                {item.icon ? (
                                    <Icon name={item.icon}/>
                                ) : null}
                                {item.label}
                            </MenuItem>
                        ))}
                    </Menu>


                    <IconButton color={'inherit'}>
                        <Home fontSize={'large'}/>
                    </IconButton>
                    <IconButton color={'inherit'}>
                        <AccountCircle fontSize={'large'}/>
                    </IconButton>
                    {/* Theme Switcher Button */}
                    <IconButton color={'inherit'} onClick={() => setOpenThemingDialogue(true)}>
                        <Palette fontSize={'large'}/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer anchor={"left"} open={drawerOpen} onClose={() => toggleDrawer(false)}>
                <List sx={{width: 250}}>
                    {menuItems.map((item, index) => (
                        <Fragment key={index}>
                            <ListItem onClick={item.onClick} className={'clickable'}>
                                {item.icon ? (
                                    <ListItemIcon><Icon name={item.icon}></Icon></ListItemIcon>
                                ) : null}
                                <ListItemText>{item.label}</ListItemText>
                            </ListItem>
                            {index === menuItems.length - 2 && <Divider/>}
                        </Fragment>
                    ))}
                </List>
            </Drawer>
            {/* Theme Selection Dialog */}
            <PopupDialog open={openThemingDialogue} title={"Select a Theme"} confirmText={"Apply"}
                         onClose={() => setOpenThemingDialogue(false)}
                         onConfirm={() => setOpenThemingDialogue(false)}>
                <RadioGroup value={theme} onChange={handleChangeTheme}>
                    {Object.values(Theme).map((themeName) => (
                        <FormControlLabel
                            key={themeName}
                            value={themeName}
                            control={<Radio/>}
                            label={themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                        />
                    ))}
                </RadioGroup>
            </PopupDialog>
        </>
    );
};

export default TopAppBar;
