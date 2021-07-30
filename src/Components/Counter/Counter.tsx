import { Button, makeStyles, Theme } from '@material-ui/core'
import React from 'react'

import { useUaiTaskStore } from '../../stores/uaiTaskStore'

const useStyles = makeStyles<Theme>(theme => ({
    counterRoot: {
        margin: theme.spacing(2),
    },
}))

const Counter = (): JSX.Element => {
    const counter = useUaiTaskStore(store => store.counter)
    const increase = useUaiTaskStore(store => store.increase)

    const classes = useStyles({})

    return (
        <div className={classes.counterRoot}>
            <Button variant="contained" color="primary" onClick={increase}>
                count is: {counter}
            </Button>
        </div>
    )
}

export default Counter
