import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

import { useFramesStore } from '../../stores/framesStore'
import { UaiTheme } from '../../utils/theme'
import Frame from './Frame'
import FramesControl, { ControlType } from './FramesControl'

const useStyles = makeStyles<UaiTheme>({
    framesRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '100%',
    },
})

const Frames = (): JSX.Element => {
    // TODO - this component should actually take care of sliding in the frames (left <> right)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [frameIndex, setFrameIndex] = useState(0)
    const [controlType, setControlType] = useState<ControlType>('Viewing')
    const frames = useFramesStore(store => store.frames)
    const classes = useStyles()

    return (
        <div className={classes.framesRoot}>
            {frames.map(frame => (
                <Frame
                    currentFrameIndex={frameIndex}
                    controlType={controlType}
                    key={frame.url}
                    {...frame}
                />
            ))}
            <FramesControl
                currentFrameIndex={frameIndex}
                controlType={controlType}
                onControlTypeChange={setControlType}
            />
        </div>
    )
}

export default Frames
