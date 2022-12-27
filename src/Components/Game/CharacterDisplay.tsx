import { Accessor, For } from "solid-js"
import picture from "../../assets/picture.jpg"
import { Character } from "../../types"

const IMG_WIDTH = 960
const IMG_HEIGHT = 960

export const CharacterDisplay = ({
    getCharacters
} : {
    getCharacters: Accessor<Character[]>
}) => {

    return (
        <div class="w-full sticky top-0 p-2 z-10
        bg-white shadow-md
        flex justify-around flex-wrap">
            <For each={getCharacters()}>
                {({ name, percent1: [X1, Y1], percent2: [X2, Y2] }) =>
                    <div class="flex flex-col items-center">
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
    )
}