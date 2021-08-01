import { TransformModel } from '../../../models/transform'
import { ControlType } from '../FramesControl'

const getTransformByModel = (params: TransformModel): string => {
    return `scale(${params.zoomFactor / 100 + 1}) rotate(${params.rotate}deg)`
}

const getNextControlType = (controlType: ControlType): ControlType => {
    return controlType === 'Panning' ? 'Viewing' : 'Panning'
}

const frameUtils = { getTransformByModel, getNextControlType }
export default frameUtils
