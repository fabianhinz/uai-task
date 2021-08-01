import {
    Drawer,
    Fab,
    Hidden,
    makeStyles,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import React, { useState } from 'react'

import { UaiTheme } from '../../utils/theme'
import Tags from '../Tags/Tags'

const useStyles = makeStyles<UaiTheme>(theme => ({
    navRoot: {
        padding: theme.spacing(3),
        gap: theme.spacing(3),
        justifyContent: 'space-between',
        [theme.breakpoints.up('sm')]: {
            width: theme.uai.nav.width,
        },
    },
    fab: {
        position: 'fixed',
        top: theme.spacing(2),
        right: theme.spacing(2),
        lineHeight: 0,
    },
}))

const Nav = (): JSX.Element => {
    const [open, setOpen] = useState(false)
    const classes = useStyles()
    const theme = useTheme<UaiTheme>()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{ component: 'nav' }}
                classes={{ paper: classes.navRoot }}
                variant={smDown ? 'temporary' : 'permanent'}
                anchor="right">
                <Typography variant="h5">Tagging</Typography>
                <Tags />
            </Drawer>

            <Hidden mdUp>
                <Fab onClick={() => setOpen(prev => !prev)} className={classes.fab}>
                    <Menu />
                </Fab>
            </Hidden>
        </>
    )
}

export default Nav
