import { ThemeProvider as MuiThemeProvider } from '@material-ui/core'
import React from 'react'

import { ChildProps } from '../../models/typehelper'
import theme from '../../utils/theme'

const ThemeProvider = (props: ChildProps): JSX.Element => {
    return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
}

export default ThemeProvider
