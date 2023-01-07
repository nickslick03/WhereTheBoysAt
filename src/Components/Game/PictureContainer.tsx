import { JSX, Setter } from "solid-js"
import picture from "../../assets/picture.jpg"
import { Coords } from "../../types"

export const PictureContainer = ({
    setCoordsPx,
    setCoordsPercent,
    children,
} : { 
    setCoordsPx: Setter<Coords>
    setCoordsPercent: Setter<Coords>
    children?: JSX.Element
}) => {

    let ref: HTMLImageElement | undefined

    const pictureClick = (e: MouseEvent) => {

        setCoordsPx([
            e.offsetX,
            e.offsetY
        ])
        
        setCoordsPercent([
            e.offsetX / ref!.offsetWidth,
            e.offsetY / ref!.offsetHeight
        ])
    }

    return (
        <div class="relative 
        flex flex-col items-center 
        w-full shadow-lg">
            {children}         
            <img
                src={picture}
                alt="picture.jpg"
                class="w-full"
                ref={ref}
                onClick={pictureClick} />
        </div>

    )
}
