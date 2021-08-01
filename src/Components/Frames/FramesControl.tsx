import { Divider, Hidden, IconButton, makeStyles, Paper, Slider } from '@material-ui/core'
import { Mouse, PanTool, RotateLeft, RotateRight, ZoomIn, ZoomOut } from '@material-ui/icons'
import React, { useCallback } from 'react'

import { useFramesStore } from '../../stores/framesStore'
import { UaiTheme } from '../../utils/theme'
import frameUtils from './utils/frameUtils'

const useStyles = makeStyles<UaiTheme>(theme => ({
    controlRoot: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        padding: theme.spacing(1),
    },
    buttonsContainer: {
        display: 'flex',
        gap: theme.spacing(0.5),
        marginBottom: theme.spacing(1),
    },
    sliderContainer: {
        padding: `0px ${theme.spacing(2)}px`,
        display: 'flex',
        gap: theme.spacing(2),
        alignItems: 'center',
        width: 250,
    },
    divider: {
        height: 48,
    },
}))

export type ControlType = 'Viewing' | 'Panning'

interface Props {
    currentFrameIndex: number
    controlType: ControlType
    onControlTypeChange: (controlType: ControlType) => void
}

const FramesControl = (props: Props): JSX.Element => {
    const currentFrame = useFramesStore(
        useCallback(store => store.frames[props.currentFrameIndex], [props.currentFrameIndex])
    )
    const transformFrame = useFramesStore(store => store.transformFrame)
    const classes = useStyles()

    const handleFrameTransformation = (
        change:
            | { type: 'rotateLeft' }
            | { type: 'rotateRight' }
            | { type: 'zoomFactor'; value: number }
    ) => {
        const index = props.currentFrameIndex
        switch (change.type) {
            case 'rotateLeft':
            case 'rotateRight': {
                transformFrame({
                    index,
                    rotate:
                        change.type === 'rotateLeft'
                            ? currentFrame.rotate - 90
                            : currentFrame.rotate + 90,
                })
                break
            }
            case 'zoomFactor': {
                transformFrame({
                    index,
                    zoomFactor: change.value as number,
                })
                break
            }
        }
    }

    const handleControlChange = () => {
        props.onControlTypeChange(frameUtils.getNextControlType(props.controlType))
    }

    return (
        <Paper className={classes.controlRoot}>
            <div className={classes.buttonsContainer}>
                <IconButton onClick={handleControlChange}>
                    {props.controlType === 'Panning' ? <PanTool /> : <Mouse />}
                </IconButton>

                <IconButton onClick={() => handleFrameTransformation({ type: 'rotateLeft' })}>
                    <RotateLeft />
                </IconButton>

                <IconButton onClick={() => handleFrameTransformation({ type: 'rotateRight' })}>
                    <RotateRight />
                </IconButton>

                <Hidden smDown>
                    <Divider className={classes.divider} orientation="vertical" />

                    <div className={classes.sliderContainer}>
                        <ZoomOut />
                        <Slider
                            onChangeCommitted={(_, value) =>
                                handleFrameTransformation({
                                    type: 'zoomFactor',
                                    value: value as number,
                                })
                            }
                            min={0}
                            max={300}
                        />
                        <ZoomIn />
                    </div>
                </Hidden>
            </div>
        </Paper>
    )
}

export default FramesControl
