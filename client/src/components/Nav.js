import React from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Icon
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'

const Nav = (props) => {
    return props.authenticated && props.currentUser ? (
        <AppBar position="absolute">
            <Toolbar>
                <IconButton
                    onClick={() => props.history.push('/')}
                    edge="start"
                    aria-label="menu"
                    style={{ color: 'white' }}
                >
                    <Icon >public</Icon>
                </IconButton>
                <Typography variant="h6">
                    Jeopardy Builder
                </Typography>
                <Typography variant="h6">
                    Hello, {props.currentUser.name}
                </Typography>
                <Button onClick={() => props.history.push('/profile')}>
                    Profile
                </Button>
                <Button
                    href="/"
                    onClick={() => localStorage.clear()}
                    style={{ color: 'white' }}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    ) : (
            <AppBar position="absolute">
                <Toolbar>
                    <IconButton
                        onClick={() => props.history.push('/')}
                        edge="start"
                        aria-label="menu"
                        style={{ color: 'white' }}
                    >
                        <Icon >public</Icon>
                    </IconButton>
                    <Typography variant="h6">
                        Jeopardy Builder
                    </Typography>
                    <Button color="inherit" href="/login">
                        Sign In
                    </Button>
                    <Button color="inherit" href="/register">
                        Sign Up
                    </Button>
                </Toolbar>
            </AppBar>
        )
}

export default withRouter(Nav)