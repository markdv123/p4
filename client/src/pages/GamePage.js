import React, { useState, useEffect } from 'react'
import { __GetGameById } from '../services/GameServices'
import { __GetCategoriesByGame } from '../services/CategoryServices'
import { __GetQuestionsByCategory } from '../services/QuestionServices'
import { withRouter } from 'react-router-dom'
import Nav from '../components/Nav'
import { Grid } from '@material-ui/core'

const GamePage = (props) => {
    const [game, setGame] = useState({})
    const [cats, setCat] = useState([])
    const [qs, setQs] = useState([])

    useEffect(() => {
        getGame()
        getQuestions()
    }, [])

    const getGame = async () => {
        try {
            const gameId = props.match.params.game_id
            const res = await __GetGameById(gameId)
            setGame(res)
            const resp = await __GetCategoriesByGame(gameId)
            setCat(resp)
        } catch (error) {
            throw error
        }
    }

    const getQuestions = () => {
        console.log('please')
        const arr = []
        cats.forEach(async (cat) => {
            try {
                const res = await __GetQuestionsByCategory(cat._id)
                arr.push(res)
            } catch (error) {
                throw error
            }
        })
        setQs(arr)
    }

    return (
        <div>
            <Nav
                {...props}
                authenticated={props.authenticated}
                currentUser={props.currentUser}
            />
            {game.title ? (<h1 style={{ textAlign: 'center' }, { marginTop: "100px" }}>{game.title}</h1>) : null}
            <Grid container justify="center" style={{ marginTop: "100px" }}>
                {cats.length ? (
                    cats.map((cat, i) => (
                        <div style={{display: 'flex'}, {flexDirection: "column"}}>
                        <div style={{ display: 'flex' }, {flexDirection: "column"}}>
                            <div id={i} key={i}>
                                {cat.name}
                            </div>
                            {qs.length ? (
                                qs[i].map((q, i) => (
                                    <div key={i}>
                                        {q.points}
                                    </div>
                                ))) : null}
                        </ div>
                        </ div>
                    ))
                ) : null}
            </Grid>
        </div>
    )
}

export default withRouter(GamePage)