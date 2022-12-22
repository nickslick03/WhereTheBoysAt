import { JSX, Setter } from "solid-js"
import picture from "./assets/picture.jpg"
import { Coords } from "./types"

export const PictureContainer = ({
    setCoordsPx,
    children,
} : { 
    setCoordsPx: Setter<Coords>
    children?: JSX.Element
}) => {

    const pictureClick = (e: MouseEvent) => setCoordsPx([
        e.offsetX,
        e.offsetY
    ])

    return (
        <div class="relative flex flex-col items-center">
            {children}         
            <img
                src={picture}
                alt="picture.jpg"
                class="w-full"
                onClick={pictureClick} />
        </div>

    )
}
