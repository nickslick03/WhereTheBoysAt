import { PictureContainer } from "./PictureContainer"
import charactersJSON from "./assets/characters.json"
import picture from "./assets/picture.jpg"
import { createSignal, For } from "solid-js"
import { Coords } from "./types"
import { SelectorCircle } from "./SelectorCircle"
import { SelectorMenu } from "./SelectorMenu"
import { Character } from "./types"

const IMG_WIDTH = 960
const IMG_HEIGHT = 960

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

    const checkIsCorrect = (name: string) => {

        const characterIndex = getCharacters()
            .findIndex(character => character.name === name)
        const isCorrect = clickIsWithinRange(
            pxCoordsToPercent(getCoordsPx()),
            getCharacters()[characterIndex].percent1,
            getCharacters()[characterIndex].percent2
        )
        
        if (isCorrect) setCharacters((characters) => [
            ...characters.slice(0, characterIndex),
            ...characters.slice(characterIndex + 1)
        ])

        setCoordsPx([-200, -200])
    }

    return (
        <div>
            <div class="flex justify-around flex-wrap">
                <For each={getCharacters()} fallback={''}>
                    {({ name, percent1: [X1, Y1], percent2: [X2, Y2] }) =>
                        <div class="my-5 flex flex-col items-center">
                            <div>
                                {name}
                            </div>
                            <div
                                class="rounded-lg shadow-md"
                                style={{
                                    "height": `${(Y2 - Y1) * IMG_HEIGHT}px`,
                                    "width": `${(X2 - X1) * IMG_WIDTH}px`,
                                    "background-image": `url(${picture})`,
                                    "background-position": `-${X1 * IMG_WIDTH}px -${Y1 * IMG_HEIGHT}px`
                                }}></div>
                        </div>}
                </For>
            </div>
            <PictureContainer setCoordsPx={setCoordsPx}>
                <>
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
