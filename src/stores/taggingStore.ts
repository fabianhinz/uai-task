import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { TagModel } from '../models/tag'
import { useFramesStore } from './framesStore'
import storeConstants from './utilts/storeConstants'

export type TaggingStoreState = {
    tags: TagModel[]
}

export type TaggingStoreActions = {
    getTags: () => Promise<void>
    postTagsForCurrentFrame: (tags: Record<string, unknown>) => Promise<void>
}

type TaggingStore = TaggingStoreState & TaggingStoreActions

/**
 * stores frames mocked via {@link storeConstants.defaultTags}
 */
export const useTaggingStore = create<TaggingStore>(
    devtools(
        set => ({
            tags: [],
            // TODO - api call
            getTags: async () => {
                set({ tags: storeConstants.defaultTags })
            },
            //TODO - api call
            postTagsForCurrentFrame: async params => {
                const currentFrame = useFramesStore.getState().currentFrame
                console.warn('not implemented', params, currentFrame)
            },
        }),
        'TaggingStore'
    )
)
