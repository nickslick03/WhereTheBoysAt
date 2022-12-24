import { Accessor, createEffect, createMemo, Setter } from "solid-js"
import { Coords } from "./types"


const animation = {
    duration: 1500,
    easing: 'ease-out',
}
const keyframes = [
    { transform: 'translateY(0px)',   opacity: 1, display: 'block' },
    { opacity: .8, display: 'block'},
    { transform: 'translateY(-50px)', opacity: 0, display: 'block' },
]

export const FloatingIcon = ({
    getCoordsPx,
    getIsCorrect,
    setSeconds
} : {
    getCoordsPx: Accessor<Coords>
    getIsCorrect: Accessor<boolean | null>
    setSeconds: Setter<number>
}) => {

    let ref: HTMLDivElement | undefined

    const screenCoordsPx = createMemo<Coords>((prev) =>
        getCoordsPx()[0] !== -200
            ? getCoordsPx()
            : prev
    , getCoordsPx())

    const prevCoordsPx = createMemo<Coords>((prev) =>
        getCoordsPx()[0] === -200
        && screenCoordsPx()[0] !== prev[0] && screenCoordsPx()[1] !== prev[1]
            ? screenCoordsPx()
            : prev
    , screenCoordsPx())

    createEffect(() => {
        if (getIsCorrect() !== null) ref?.animate(keyframes, animation)
        if (getIsCorrect() === false) setSeconds(prev => prev + 10)
    })

    return (
        <div
            class="absolute -translate-x-1/2 -translate-y-1/2 
            select-none pointer-events-none
            text-2xl font-bold opacity-0"
            style={{
                "left": prevCoordsPx()[0] + "px",
                "top":  prevCoordsPx()[1] + "px"
            }}
            ref={ref}>
            {getIsCorrect() ? '✅' : <div>
                    ❌
                    <br />
                    + 10 seconds
                </div>}
        </div>
    )
}


