import { A } from "@solidjs/router"
import { createResource, For, Show } from "solid-js"
import { supabase } from ".."
import { BackgroundContainer } from "./BackgroundContainer"
import { formatSeconds } from "./Game/Timer"

const fetchScores = async () => 
    (await supabase.from('scores')
        .select("*")).data as unknown as {
            name: string,
            seconds: number
        }[]

export const Scores = () => {

    const [getScores] = createResource(fetchScores)

    return (
        <BackgroundContainer>
            <div class="flex flex-col gap-8 justify-center items-center">
                <A 
                    class="button"
                    href="..">
                    Back to Home
                </A>
                <Show 
                    when={!getScores.loading}
                    fallback={<div>loading...</div>}>
                    <table class="w-1/2 text-xl border-spacing-2 border-separate">
                        <thead>
                            <tr>
                                <th class="th">
                                    Name
                                </th>
                                <th class="th">
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <For each={getScores()
                            ?.sort((a, b) => a.seconds - b.seconds)}>{({name, seconds}) => 
                                <tr>
                                    <td class="tr">
                                        {name}
                                    </td>
                                    <td class="tr whitespace-nowrap">
                                        {formatSeconds(seconds)}
                                    </td>
                                </tr>}
                            </For>
                        </tbody>
                    </table> 
                </Show>
            </div>
        </BackgroundContainer>
    )
}