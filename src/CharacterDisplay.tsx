import { Accessor, For } from "solid-js"
import picture from "./assets/picture.jpg"
import { Character } from "./types"

const IMG_WIDTH = 960
const IMG_HEIGHT = 960

export const CharacterDisplay = ({
    getCharacters
} : {
    getCharacters: Accessor<Character[]>
}) => {

    return (
        <div class="flex justify-around flex-wrap w-full">
            <For each={getCharacters()}>
                {({ name, percent1: [X1, Y1], percent2: [X2, Y2] }) =>
                    <div class="flex flex-col items-center">
                        <div
                            class="rounded-lg shadow-md"
                            style={{
                                "height": `${(Y2 - Y1) * IMG_HEIGHT}px`,
                                "width": `${(X2 - X1) * IMG_WIDTH}px`,
                                "background-image": `url(${picture})`,
                                "background-position": `-${X1 * IMG_WIDTH}px -${Y1 * IMG_HEIGHT}px`
                            }}></div>
                        <div>
                            {name}
                        </div>    
                    </div>}
            </For>
        </div>
    )
}