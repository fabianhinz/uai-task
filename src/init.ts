import { useFramesStore } from './stores/framesStore'
import { useTaggingStore } from './stores/taggingStore'

/**
 * kicking off data fetching as soon as possible
 */
const init = async (): Promise<void> => {
    await Promise.all([useFramesStore.getState().getFrames(), useTaggingStore.getState().getTags()])
}

export default init
