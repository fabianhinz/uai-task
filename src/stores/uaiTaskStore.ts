import create from 'zustand'
import { devtools } from 'zustand/middleware'

export type UaiTaskStoreState = { counter: number }

export type UaiTaskStoreActions = {
    increase: () => void
    decrease: () => void
}

type UaiTaskStore = UaiTaskStoreState & UaiTaskStoreActions

export const useUaiTaskStore = create<UaiTaskStore>(
    devtools(
        (set, get) => ({
            counter: 0,
            increase: () => {
                set({ counter: get().counter + 1 })
            },
            decrease: () => {
                set({ counter: get().counter - 1 })
            },
        }),
        'UaiTaskStore'
    )
)
