import { Accessor } from "solid-js"

export const Box = ({
    coordsPx
} : {
    coordsPx: Accessor<[number, number]>
}) =>
    <div 
        class="absolute 
        w-sizable h-sizable 
        bg-sky-700 bg-opacity-50 
        translate-x-center translate-y-center 
        rounded-max border-2 border-black"
        style={{
            "left": coordsPx()[0] + "px",
            "top":  coordsPx()[1] + "px"
        }}>
    </div>