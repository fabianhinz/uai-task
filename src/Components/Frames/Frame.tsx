import { makeStyles } from '@material-ui/core'
import React, { useLayoutEffect, useRef, useState } from 'react'

import { FrameModel } from '../../models/frame'
import { TransformModel } from '../../models/transform'
import { UaiTheme } from '../../utils/theme'
import { ControlType } from './FramesControl'
import frameUtils from './utils/frameUtils'

type StyleProps = TransformModel & { controlType: ControlType; panning: boolean }

const useStyles = makeStyles<UaiTheme, StyleProps>(theme => ({
    frameRoot: {
        width: '100%',
        maxHeight: '100vh',
        transform: frameUtils.getTransformByModel,
        transition: theme.transitions.create('transform'),
        cursor: props => (props.controlType === 'Panning' ? 'grab' : 'default'),
    },
}))

type Props = FrameModel & { controlType: ControlType; currentFrameIndex: number }

const Frame = (props: Props): JSX.Element => {
    const [panning, setPanning] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null!)
    const classes = useStyles({ ...props, panning })

    useLayoutEffect(() => {
        if (props.controlType === 'Panning') return

        containerRef.current.setAttribute('style', `transform: translate(0)`)
    }, [props.controlType])

    const handleMouseMove = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (!panning) return

        const { width, height } = containerRef.current.getBoundingClientRect()
        const newX = event.clientX - width / 2
        const newY = event.clientY - height / 2

        containerRef.current.setAttribute('style', `transform: translate(${newX}px, ${newY}px)`)
    }

    return (
        <div
            ref={el => {
                if (el) containerRef.current = el
            }}
            onMouseMove={handleMouseMove}
            onMouseDown={() => {
                props.controlType === 'Panning' && setPanning(true)
            }}
            onMouseUp={() => setPanning(false)}>
            <img draggable="false" className={classes.frameRoot} src={props.url} />
        </div>
    )
}

export default Frame
