import { Checkbox, Fab, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import { useFramesStore } from '../../stores/framesStore'
import { useTaggingStore } from '../../stores/taggingStore'
import { UaiTheme } from '../../utils/theme'

const useStyles = makeStyles<UaiTheme>(theme => ({
    tagsRoot: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
    corruptContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

const Tags = (): JSX.Element => {
    const [values, setValues] = useState<Record<string, unknown>>({})
    const [stringifiedValues, setStringifiedValues] = useState<string>('')
    const tags = useTaggingStore(store => store.tags)
    const postTagsForCurrentFrame = useTaggingStore(store => store.postTagsForCurrentFrame)
    const classes = useStyles()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await postTagsForCurrentFrame(values)
        setStringifiedValues(JSON.stringify(values, null, 2))
    }

    const handleTextFieldChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [key]: event.target.value }))
    }

    const handleCheckBoxChange = (key: string) => (_: unknown, checked: boolean) => {
        setValues(prev => ({ ...prev, [key]: checked }))
    }

    return (
        <form onSubmit={handleSubmit} className={classes.tagsRoot}>
            <div className={classes.inputContainer}>
                {tags.map(tag => (
                    <TextField
                        key={tag.category}
                        defaultValue=""
                        onChange={handleTextFieldChange(tag.category)}
                        label={tag.displayName}
                        required={tag.required}
                        select>
                        {tag.values.map(value => (
                            <MenuItem key={value} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                ))}

                <div className={classes.corruptContainer}>
                    <Typography component="span" color="textSecondary">
                        Corrupt Image
                    </Typography>
                    <Checkbox onChange={handleCheckBoxChange('corrupt')} />
                </div>
            </div>

            <pre>{stringifiedValues}</pre>

            <Fab type="submit" color="secondary" variant="extended">
                save
            </Fab>
        </form>
    )
}

export default Tags
