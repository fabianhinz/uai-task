import produce from 'immer'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { FrameModel } from '../models/frame'
import { TransformModel } from '../models/transform'
import storeConstants from './utilts/storeConstants'

export type FramesStoreState = {
    frames: FrameModel[]
}

export type FramesStoreActions = {
    currentFrame: FrameModel | null
    getFrames: () => Promise<void>
    setCurrentFrame: (frame: FrameModel) => void
    transformFrame: (params: Partial<TransformModel> & { index: number }) => void
}

type FramesStore = FramesStoreState & FramesStoreActions

/**
 * stores frames mocked via {@link storeConstants.defaultFrames} and mutation of those frames via {@link TransformModel}
 */
export const useFramesStore = create<FramesStore>(
    devtools(
        (set, get) => ({
            currentFrame: null,
            frames: [],
            setCurrentFrame: currentFrame => {
                set({ currentFrame })
            },
            transformFrame: params => {
                set({
                    frames: produce(get().frames, draft => {
                        const { index, ...transformModel } = params
                        const currentFrame = draft[index]
                        draft[params.index] = {
                            ...currentFrame,
                            ...transformModel,
                        }
                    }),
                })
            },
            // TODO - api call
            getFrames: async () => {
                set({
                    frames: storeConstants.defaultFrames,
                    currentFrame: storeConstants.defaultFrames[0],
                })
            },
        }),
        'FramesStore'
    )
)
