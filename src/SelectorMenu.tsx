import { Accessor, createMemo, For, Setter } from "solid-js"
import { Character, Coords } from "./types"

export const SelectorMenu = ({
    getCharactors,
    getCoordsPx,
    setCoordsPx,
    checkIsCorrect
} : {
    getCharactors: Accessor<Character[]>,
    getCoordsPx: Accessor<Coords>,
    setCoordsPx: Setter<Coords>,
    checkIsCorrect: (name: string) => void
}) => {

    const leftPixelOffset = createMemo(() => 
        getCoordsPx()[0] / window.innerWidth < .5
            ? 100
            : -100)

    return (
        <div 
        class="absolute z-20 -translate-x-1/2 -translate-y-1/2
        bg-slate-50 flex flex-col items-center 
        p-1 gap-1 rounded shadow"
        style={{
            "left": getCoordsPx()[0] + leftPixelOffset() + "px",
            "top":  getCoordsPx()[1] - 100 + "px"
        }}>
            <For each={getCharactors()}>
                {({name}) => 
                <button 
                    class="p-1 rounded inline
                    hover:bg-slate-300 
                    active:bg-slate-400"
                    onclick={() => checkIsCorrect(name)}>
                    {name}
                </button>}
            </For>
            <button
                class="text-white bg-red-600 
                p-1 rounded shadow
                hover:bg-red-700
                active:bg-red-800"
                onClick={() => setCoordsPx([-200, 200])}>
                Cancel
            </button>
        </div>
    )
}