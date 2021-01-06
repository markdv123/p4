import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import {
    Grid,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,

} from '@material-ui/core'
import SetGame from '../components/SetGame'
import SetCats from '../components/SetCats'
import SetQs from '../components/SetQs'

function getSteps() {
    return ['Create Game', 'Create Categories', 'Create Questions']
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Title your game and give it a description! Decide how many categories and questions you will need.'
        case 1:
            return 'Name your Categories!'
        case 2:
            return 'Input your questions and answers! Define their point values!'
        default:
            return 'Unknown stepIndex'
    }
}

const CreatGame = (props) => {
    const [activeStep, setActiveStep] = React.useState(0)
    const steps = getSteps()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    let content = ''
    switch (activeStep) {
        case 0:
            content = <SetGame/>
            break
        case 1:
            content = <SetCats/>
            break
        case 2:
            content = <SetQs/>
    }
    return (
        <div>
            <Nav
                {...props}
                authenticated={props.authenticated}
                currentUser={props.currentUser}
            />
            <div style={{ width: "100%" }, {marginTop: '100px'}}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography >All steps completed</Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div>
                                <Typography>{getStepContent(activeStep)}</Typography>
                                <Grid container>
                                    {content}
                                </Grid>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default CreatGame