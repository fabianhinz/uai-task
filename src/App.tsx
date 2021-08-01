import { CssBaseline } from '@material-ui/core'
import React from 'react'

import Main from './Components/Layout/Main'
import Nav from './Components/Layout/Nav'
import ThemeProvider from './Components/Provider/ThemeProvider'
import init from './init'
import { ChildProps } from './models/typehelper'

init()

/**
 * wrapper around all instances of [React.Context](https://reactjs.org/docs/context.html)
 */
const Provider = (props: ChildProps) => <ThemeProvider>{props.children}</ThemeProvider>

const App = (): JSX.Element => (
    <Provider>
        <CssBaseline />

        <Main />
        <Nav />
    </Provider>
)

export default App
