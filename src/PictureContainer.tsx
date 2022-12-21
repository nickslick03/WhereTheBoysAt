import { Accessor, createSignal, Setter } from "solid-js"
import picture from "./assets/picture.jpg"
import { SelectorCircle } from "./SelectorCircle"
import { Coords } from "./Game"

export const PictureContainer = ({ 
    getCoordsPx, 
    setCoordsPx 
} : { 
    getCoordsPx: Accessor<Coords>
    setCoordsPx: Setter<Coords>
}) => {

    const pictureClick = (e: MouseEvent) => setCoordsPx([
        e.offsetX,
        e.offsetY
    ])

    return (
        <div class="relative">
            <SelectorCircle getCoordsPx={getCoordsPx} />
            <img
                src={picture}
                alt="picture.jpg"
                class="w-full"
                onClick={pictureClick} />
        </div>

    )
}