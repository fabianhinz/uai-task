import { makeStyles } from '@material-ui/core'
import React from 'react'

import { UaiTheme } from '../../utils/theme'
import Frames from '../Frames/Frames'

const useStyles = makeStyles<UaiTheme>(theme => ({
    mainRoot: {
        width: `calc(100vw - ${theme.uai.nav.width}px)`,
        height: '100vh',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            width: '100vw',
        },
    },
}))

const Main = (): JSX.Element => {
    const classes = useStyles({})

    return (
        <main className={classes.mainRoot}>
            <Frames />
        </main>
    )
}

export default Main
