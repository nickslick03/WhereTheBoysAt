import { A } from "@solidjs/router"
import { BackgroundContainer } from "./BackgroundContainer"

export const Scores = () => {

    return (
        <BackgroundContainer>
            <div class="flex flex-col gap-8 justify-center items-center">
                <A 
                    class="button"
                    href="/">
                    Back to Home
                </A>
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
                        <tr>
                            <td class="tr">
                                Nick
                            </td>
                            <td class="tr">
                                2:00
                            </td>
                        </tr>
                    </tbody>
                </table> 
            </div>
        </BackgroundContainer>
    )
}