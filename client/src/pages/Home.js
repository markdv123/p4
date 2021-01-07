import React from 'react'
import Nav from '../components/Nav'
import {Grid} from '@material-ui/core'

const Home = (props) => {
    return (
        <div>
            <Nav
                {...props}
                authenticated={props.authenticated}
                currentUser={props.currentUser}
            />
            <div style={{textAlign: 'center'}}>
                <Grid container justify="center" style={{paddingTop: "90px"}}>
                    <h1>Get Started Stuff</h1>
                </Grid>
            </div>
        </div>
    )
}

export default Home