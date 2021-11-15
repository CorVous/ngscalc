interface testStore {
    class: {
        id: number
        level: number
    }
    weapon: {
        seriesId: number
        level: number
    }
    armor: [
        {
            id: number
            level: number
        },
        {
            id: number
            level: number
        },
        {
            id: number
            level: number
        },
    ]
    affixes: number[]
    enemy: {
        id: number
        level: number
    }
}

export {}