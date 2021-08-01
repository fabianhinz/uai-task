export interface TagModel {
    values: (string | number)[]
    category: 'weatherCondition' | 'laneCount' | 'environment'
    displayName: string
    required?: boolean
}
