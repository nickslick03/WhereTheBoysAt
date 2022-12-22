import { Accessor } from "solid-js"

export const SelectorCircle = ({
    getCoordsPx
} : {
    getCoordsPx: Accessor<[number, number]>
}) =>
    <div 
        class="absolute translate-x-center translate-y-center 
        w-sizable h-sizable 
        bg-sky-700 bg-opacity-50
        rounded-max border-2 border-black
        shadow-dark"
        style={{
            "left": getCoordsPx()[0] + "px",
            "top":  getCoordsPx()[1] + "px"
        }}>
    </div>
