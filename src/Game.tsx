import { createEffect, createSignal } from "solid-js"
import charactersJSON from "./assets/characters.json"
import { CharacterDisplay } from "./CharacterDisplay"
import { FloatingIcon } from "./FloatingIcon"
import { PictureContainer } from "./PictureContainer"
import { SelectorCircle } from "./SelectorCircle"
import { SelectorMenu } from "./SelectorMenu"
import { Timer } from "./Timer"
import { Character, Coords } from "./types"

const pxCoordsToPercent = (coords: Coords): Coords => [
    coords[0] / window.innerWidth,
    coords[1] / window.innerWidth
]

const clickIsWithinRange = (clickPercent: Coords, percent1: Coords, percent2: Coords) =>
    clickPercent[0] > percent1[0]
    && clickPercent[1] > percent1[1]
    && clickPercent[0] < percent2[0]
    && clickPercent[1] < percent2[1]

const randomIndicies = (range: number, length: number) => {

    const indicies: number[] = []

    for (let i = 0; i < length; i++) {
        do {
            indicies[i] = Math.floor(Math.random() * range)
        } while (
            indicies.some((num, j) =>
                i !== j
                    ? num === indicies[i]
                    : false
            )
        )
    }

    return indicies
}

export const Game = () => {

    const [ getCoordsPx, setCoordsPx ] = createSignal<Coords>([-200, -200])

    const [ getCharacters, setCharacters ] = createSignal<Character[]>(
        randomIndicies(charactersJSON.length, 3)
            .map(index => charactersJSON[index]) as Character[])

    const [ getSeconds, setSeconds ] = createSignal(0)

    const [ getIsCorrect, setIsCorrect ] = createSignal<boolean | null>(null)

    createEffect(() => {
        if (getCoordsPx()[0] !== -200) setIsCorrect(null)
    })

    const intervalID = setInterval(() => {
        setSeconds(prev => prev + 1)
    }, 1000)

    const checkIsCorrect = (name: string) => {

        const characterIndex = getCharacters()
            .findIndex(character => character.name === name)

        setIsCorrect(
            clickIsWithinRange(
                pxCoordsToPercent(getCoordsPx()),
                getCharacters()[characterIndex].percent1,
                getCharacters()[characterIndex].percent2)
        )
        
        if (getIsCorrect()) {
            
            const length = setCharacters((characters) => [
            ...characters.slice(0, characterIndex),
            ...characters.slice(characterIndex + 1)
            ]).length

            if (length === 0) clearInterval(intervalID)
        }

        setCoordsPx([-200, -200])
    }

    return (
        <div class="flex flex-col items-center">
            <Timer getSeconds={getSeconds} />
            <CharacterDisplay getCharacters={getCharacters} />
            <PictureContainer setCoordsPx={setCoordsPx}>
                <>
                    <FloatingIcon 
                    getCoordsPx={getCoordsPx} 
                    getIsCorrect={getIsCorrect}
                    setSeconds={setSeconds}/>
                    <SelectorCircle getCoordsPx={getCoordsPx} />
                    <SelectorMenu
                        getCharactors={getCharacters}
                        getCoordsPx={getCoordsPx}
                        setCoordsPx={setCoordsPx}
                        checkIsCorrect={checkIsCorrect} />
                </>
            </PictureContainer>
        </div>
    )
}
