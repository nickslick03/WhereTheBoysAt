import { Accessor } from "solid-js"
import { Coords } from "../../types"

export const SelectorCircle = ({
    getCoordsPx
} : {
    getCoordsPx: Accessor<Coords>
}) => {
    return (
       <div 
            class="absolute z-20 -translate-x-1/2 -translate-y-1/2
            w-sizable h-sizable 
            bg-sky-700 bg-opacity-50
            rounded-max border border-black
            shadow-dark"
            style={{
                "left": getCoordsPx()[0] + "px",
                "top":  getCoordsPx()[1] + "px"
            }}>
        </div> 
    )
}
    
