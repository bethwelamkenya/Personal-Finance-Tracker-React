import React from "react";
import {Toolbar, Typography, Box, Grid, Link, IconButton, AppBar, Divider} from "@mui/material";
import Icon from "./icon";

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                position: 'static',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'background.paper',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                mt: 'auto',
                py: 4,
                borderTop: '1px solid',
                borderColor: 'divider'
            }}
        >
        {/*// <Box*/}
        {/*//     position={"static"}*/}
        {/*//     color={"inherit"} sx={{*/}
        {/*//     top: "auto",*/}
        {/*//     bottom: 0,*/}
        {/*//     py: 4,*/}
        {/*//     mt: "auto"*/}
        {/*// }}>*/}
            <Toolbar>
                <Grid container spacing={2} justifyContent="center" padding={2}>
                    {/* Quick Links */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Quick Links</Typography>
                        <Link href="#" color="inherit" underline="hover" display="block">Home</Link>
                        <Link href="#" color="inherit" underline="hover" display="block">About</Link>
                        <Link href="#" color="inherit" underline="hover" display="block">Services</Link>
                        <Link href="#" color="inherit" underline="hover" display="block">Contact</Link>
                    </Grid>

                    {/* Contact Information */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Contact Us</Typography>
                        <Box display="flex" alignItems="center">
                            <Icon name={"Phone"} style={{marginRight: 1}}/>
                            <Typography variant="body2">+123 456 7890</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Icon name={"Email"} style={{marginRight: 1}}/>
                            <Typography variant="body2">support@myapp.com</Typography>
                        </Box>
                    </Grid>

                    {/* Social Media Links */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Follow Us</Typography>
                        <Box>
                            <IconButton href="#" color="inherit"><Icon name={"Facebook"}/></IconButton>
                            <IconButton href="#" color="inherit"><Icon name={"Twitter"}/></IconButton>
                            <IconButton href="#" color="inherit"><Icon name={"Instagram"}/></IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
            <Divider/>
            {/* Copyright Section */}
            <Box textAlign="center" padding={1} bgcolor="transparent">
                <Typography variant="body2">© {new Date().getFullYear()} Personal Finance Tracker. All rights reserved.</Typography>
            </Box>
        </Box>
    )
}

export default Footer