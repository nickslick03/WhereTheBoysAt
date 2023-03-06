import { A } from "@solidjs/router"
import { createSignal } from "solid-js"
import { supabase } from "../.."
import { formatSeconds } from "./Timer"

export const GameOver = ({
    seconds
} : {
    seconds: number
}) => {
    
    let inputRef: HTMLInputElement | undefined

    const [getIsSubmitted, setIsSubmitted] = createSignal(false);

    const sumbitScore = async () => {
        if (getIsSubmitted()) return;
        await supabase.from('scores')
            .insert({
                name: inputRef!.value,
                seconds
            })
        setIsSubmitted(true);
    }

    return (
        <div class="fixed z-20
            w-screen h-screen
            bg-gray-600 bg-opacity-50
            animate-fade">
                <div class="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2
                w-3/4 bg-white p-3 rounded 
                shadow-neutral-700 shadow-lg opacity-1
                flex flex-col items-center gap-8">
                    <h1 class="text-5xl font-bold text-center">
                        Game Over!
                    </h1>
                    <div class="text-xl">
                        time: {formatSeconds(seconds).replaceAll(" ", "")}
                    </div>
                    <div class="flex flex-col items-center sm:flex-row flex-wrap gap-1 ">
                        <label for="name">Name: </label>
                        <input
                            type="text" 
                            id="name"
                            ref={inputRef}
                            disabled={getIsSubmitted()}
                            class="mx-2 shadow h-min border border-black shadow-slate-400 rounded"/>
                        <button 
                            class="button inline"
                            style={{
                                "background-color": getIsSubmitted() ? "lightgreen" : ""
                            }}
                            disabled={getIsSubmitted()}
                            onClick={sumbitScore}>
                            Submit Score
                        </button>
                    </div>
                    <div class="flex justify-around gap-5">
                        <A 
                            href="/" 
                            class="button">
                            Back to Home
                        </A>
                        <button
                            class="button"
                            onClick={() => location.reload()}>
                            Play Again
                        </button>
                        <A 
                            href="/scores"
                            class="button">
                            View Scores
                        </A>
                    </div>
                </div>
        </div>
    )
}