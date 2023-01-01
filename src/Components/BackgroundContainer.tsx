import { JSX } from "solid-js"
import homeBackground from "../assets/homeBackground.png"


export const BackgroundContainer = ({
    children
} : {
    children: JSX.Element
}) => {

    return (
        <div 
            class="flex-1 bg-cover bg-no-repeat bg-bottom" 
            style={{
                'background-image': 
                    `linear-gradient(rgb(255, 255, 255), rgba(0, 0, 0, 0)), 
                    url(${homeBackground})`,
                }}>
                {children}
        </div>
    )
}