import { PictureContainer } from "./PictureContainer"
import charactersJSON from "./assets/coords.json"
import picture from "./assets/picture.jpg"
import { createSignal, For } from "solid-js"

const IMG_WIDTH = 960
const IMG_HEIGHT = 960

export type Coords = [number, number]

const isWithinPercent = (clickPercent: Coords, percent1: Coords, percent2: Coords) =>
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

    const [ getCoordsPx, setCoordsPx ] = createSignal<Coords>([-100, -100])

    const randomCharacters: typeof charactersJSON =
        randomIndicies(charactersJSON.length, 3)
            .map(index => charactersJSON[index])

    console.log(randomCharacters)

    return (
        <div>
            <div class="flex justify-around">
                <For each={randomCharacters} fallback={''}>
                    {({ name, percent1: [X1, Y1], percent2: [X2, Y2] }) =>
                        <div class="m-2 flex flex-col items-center">
                            <div>
                                {name}
                            </div>
                            <div
                                class="rounded shadow-md"
                                style={{
                                    "height": `${(Y2 - Y1) * IMG_HEIGHT}px`,
                                    "width": `${(X2 - X1) * IMG_WIDTH}px`,
                                    "background-image": `url(${picture})`,
                                    "background-position": `-${X1 * IMG_WIDTH}px -${Y1 * IMG_HEIGHT}px`
                                }}></div>
                        </div>}
                </For>
            </div>
            <PictureContainer
                getCoordsPx={getCoordsPx}
                setCoordsPx={setCoordsPx}/>
        </div>

    )
}