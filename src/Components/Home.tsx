import { A } from "@solidjs/router"
import { BackgroundContainer } from "./BackgroundContainer"

export const Home = () => {

    return (
        <BackgroundContainer>
            <div class="flex justify-around">
                <A  
                    class="button"
                    href="./game">
                    Play Game
                </A>
                <A  
                    class="button"
                    href="./scores">
                    View Scores
                </A>    
            </div>
        </BackgroundContainer>       
    )
}