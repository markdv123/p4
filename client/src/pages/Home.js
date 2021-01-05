import React from 'react'
import Nav from '../components/Nav'
import Search from '../components/Search'
import GetStarted from '../components/GetStarted'
import Footer from '../components/Footer'
import {Grid} from '@material-ui/core'

const Home = (props) => {
    return (
        <div>
            <Nav
                authenticated={props.authenticated}
                {...props}
                currentUser={props.currentUser}
            />
            <div style={{textAlign: 'center'}}>
                <Grid container justify="center" style={{paddingTop: "90px"}}>
                    <Grid item xs={6}>
                        <GetStarted />
                    </Grid>
                    <Grid item xs={6}>
                        <Search />
                    </Grid>
                </Grid>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Home