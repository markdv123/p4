import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { Grid, Button, Icon } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { __GetGamesByUser } from '../services/GameServices'

const Profile = (props) => {
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames()
    }, [])

    const getGames = async () => {
        try {
            const res = await __GetGamesByUser(props.currentUser._id)
            setGames(res.games)
        } catch (error) {
            throw error
        }
    }

    return (
        <div>
            <Nav
                {...props}
                authenticated={props.authenticated}
                currentUser={props.currentUser}
            />
            <Grid container justify="center" style={{ textAlign: "center" }, { marginTop: "100px" }}>
                <Grid item>
                    <Button onClick={() => { props.history.push(`/create`) }} endIcon={<Icon>add</Icon>}>New Game</Button>
                </Grid>
                <Grid item>
                    <h1>My Games</h1>
                    {games.length ? (
                        games.map(game => (
                                <p onClick={()=> {props.history.push(`/play/${game._id}`)}} key={game.title}>{game.title}</p>
                        ))
                    ) : null}
                </Grid>

            </Grid>
        </div>
    )
}

export default withRouter(Profile)