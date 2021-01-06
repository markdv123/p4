import React, { useState, useEffect } from 'react'
import { __GetGameById } from '../services/GameServices'
import { __GetCategoriesByGame } from '../services/CategoryServices'
import { __GetQuestionsByCategory } from '../services/QuestionServices'
import { withRouter } from 'react-router-dom'
import Nav from '../components/Nav'
import { Grid } from '@material-ui/core'

const GamePage = (props) => {
    const [game, setGame] = useState({})

    useEffect(() => {
        getGame()
    }, [])

    const getGame = async () => {
        try {
            const gameId = props.match.params.game_id
            const res = await __GetGameById(gameId)
            setGame(res)
        } catch (error) {
            throw error
        }
    }
    console.log(game)
    return (
        <div>
            <Nav
                {...props}
                authenticated={props.authenticated}
                currentUser={props.currentUser}
            />
            {game.title ? (<h1 style={{ textAlign: 'center' }, { marginTop: "100px" }}>{game.title}</h1>) : null}
            <Grid container justify="center">
                {game.categories ? (
                    game.categories.map((cat, i) => (
                        <div style={{ display: 'flex' }, { flexDirection: "column" }, {fontSize: '60px'}} key={i}>
                            <div style={{ display: 'flex' }, { flexDirection: "column" }, {margin: "10px"}} key={i}>
                                <div id={i} key={i}>
                                    {cat.name}
                                </div>
                                {cat.questions.map((q, i) => (
                                        <div key={i}>
                                            {q.points}
                                        </div>
                                    ))}
                            </ div>
                        </ div>
                    ))
                ) : null}
            </Grid>
        </div>
    )
}

export default withRouter(GamePage)