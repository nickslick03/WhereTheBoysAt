import { createSignal } from "solid-js"
import Coords from "./assets/coords.json"
import picture from "./assets/picture.jpg"
import { Box } from "./Box"

type Coords = [number, number]

const isWithinPercent = (clickPercent: Coords, percent1: Coords, percent2: Coords) =>
    clickPercent[0] > percent1[0]
    && clickPercent[1] > percent1[1]
    && clickPercent[0] < percent2[0]
    && clickPercent[1] < percent2[1]

export const Picture = () => {

    const [getCoordsPx, setCoordsPx] = createSignal<Coords>([-100, -100]);

    const pictureClick = (e: MouseEvent & {
        currentTarget: HTMLImageElement;
        target: Element;
    }) => {

        setCoordsPx([
            e.pageX,
            e.pageY
        ])

        const clickPercent: Coords = [
            e.pageX / e.currentTarget.width,
            e.pageY / e.currentTarget.height,
        ]

        const index = Coords.findIndex(({
            percent1,
            percent2
        }) => isWithinPercent(
            clickPercent,
            percent1 as Coords,
            percent2 as Coords))

        if (index != -1) {
            console.clear()
            console.log(Coords[index])
        }
    }

    return (
        <div class="relative">
            <Box coordsPx={getCoordsPx} />
            <img
                src={picture}
                alt="picture.jpg"
                onClick={pictureClick} />
        </div>

    )
}