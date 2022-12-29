import { A } from "@solidjs/router"

export const Home = () => {

    return (
        <div class="flex justify-around">
                <A  
                    class="button"
                    href="./game">
                    Play Game
                </A>
                <A  
                    class="button"
                    href="">
                    View Scores
                </A>
        </div>
    )
}