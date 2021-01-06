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
        getQuestions(cats)
    }, [])

    const getGame = async () => {
        try {
            const gameId = props.match.params.game_id
            const res = await __GetGameById(gameId)
            setGame(res)
            const resp = await __GetCategoriesByGame(gameId)
            setCat(resp)
            console.log(26, cats)
            // getQuestions()
        } catch (error) {
            throw error
        }
    }

    const getQuestions = (cats) => {
        console.log('please')
        const arr = []
        console.log(cats)
        cats.forEach(cat => {
            const res = getQsByCat(cat._id)
            console.log(39, cat._id)
            console.log(40, res)
            arr.push(res)
        })
        console.log(43, arr)
        setQs(arr)
    }
    console.log(46, cats)
    const getQsByCat = async (catId) => {
        try {
            const res = await __GetQuestionsByCategory(catId)
            console.log(50, res)
            return res
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
            {game.title ? (<h1 style={{ textAlign: 'center' }, { marginTop: "100px" }}>{game.title}</h1>) : null}
            <Grid container justify="center" style={{ marginTop: "100px" }}>
                {cats.length ? (
                    cats.map((cat, i) => (
                        <div style={{ display: 'flex' }, { flexDirection: "column" }} key={i}>
                            <div style={{ display: 'flex' }, { flexDirection: "column" }} key={i}>
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