import coords from "./assets/coords.json"
import picture from "./assets/picture.jpg"

type percentCoords = [number, number]

const isWithinPercent = (
    clickPercent: percentCoords,
    percent1: percentCoords,
    percent2: percentCoords) =>
       clickPercent[0] > percent1[0]
    && clickPercent[1] > percent1[1]
    && clickPercent[0] < percent2[0]
    && clickPercent[1] < percent2[1]

export const Picture = () => {

    const pictureClick = (e: MouseEvent & {
        currentTarget: HTMLImageElement;
        target: Element;
    }) => {
        
        const clickPercent: percentCoords = [
            e.pageX / e.currentTarget.width,
            e.pageY / e.currentTarget.height,
        ]

        const index = coords.findIndex(({ 
            percent1, 
            percent2 
        }) => isWithinPercent(
            clickPercent, 
            percent1 as percentCoords, 
            percent2 as percentCoords))
 
        if (index != -1) {
            console.clear()
            console.log(coords[index])
        }
    }

    return (
        <img 
            src={picture} 
            alt="picture.jpg"
            onClick={pictureClick} />
    )
}