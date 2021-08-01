import { FrameModel } from '../../models/frame'
import { TagModel } from '../../models/tag'

const defaultTags: TagModel[] = [
    {
        category: 'weatherCondition',
        displayName: 'Weather Condition',
        required: true,
        values: ['rainy', 'sunny', 'cloudy', 'foggy', 'snow', 'unclear'],
    },
    {
        category: 'laneCount',
        displayName: 'Lane Count',
        required: true,
        values: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'unclear'],
    },
    {
        category: 'environment',
        displayName: 'Environment',
        required: false,
        values: ['Tunnel', 'highway', 'inner city', 'outer city', 'unclear'],
    },
]

const defaultFrames: FrameModel[] = [
    {
        rotate: 0,
        zoomFactor: 1,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/St_Kilda_Road_start.jpg/1600px-St_Kilda_Road_start.jpg',
    },
]

const storeConstants = {
    defaultTags,
    defaultFrames,
}
export default storeConstants
