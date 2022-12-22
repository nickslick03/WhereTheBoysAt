import { Accessor, For } from "solid-js"
import { Character } from "./types"

export const SelectorMenu = ({
    getCharactors,
    getCoordsPx,
    checkIsCorrect,
} : {
    getCharactors: Accessor<Character[]>,
    getCoordsPx: Accessor<[number, number]>,
    checkIsCorrect: (name: string) => void,
}) => {

    return (
        <div 
        class="absolute translate-y-center translate-x-center
        bg-slate-50 flex flex-col items-center 
        p-1 gap-1 rounded shadow"
        style={{
            "left": getCoordsPx()[0] + "px",
            "top":  (getCoordsPx()[1] - 100) + "px"
        }}>
            <For each={getCharactors()} fallback={''}>
                {({name}) => 
                <button 
                    class="p-1 rounded 
                    hover:bg-slate-300 
                    active:bg-slate-400"
                    onclick={() => checkIsCorrect(name)}>
                    {name}
                </button>}
            </For>
        </div>
    )
}