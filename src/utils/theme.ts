import { createTheme, Theme } from '@material-ui/core'
import { amber, lightBlue } from '@material-ui/core/colors'

const uai = { nav: { width: 500 } }
const theme = createTheme(
    {
        palette: {
            primary: lightBlue,
            secondary: amber,
            type: 'dark',
        },
        props: {
            MuiTextField: {
                variant: 'filled',
            },
        },
        shape: {
            borderRadius: 10,
        },
        overrides: {
            MuiFab: {
                label: {
                    textTransform: 'uppercase',
                    fontWeight: 600,
                },
            },
        },
    },
    { uai }
)

export type UaiTheme = Theme & { uai: typeof uai }
export default theme
