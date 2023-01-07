import { createEffect, createResource, createSignal, Show } from "solid-js"
import { CharacterDisplay } from "./CharacterDisplay"
import { FloatingIcon } from "./FloatingIcon"
import { PictureContainer } from "./PictureContainer"
import { SelectorCircle } from "./SelectorCircle"
import { SelectorMenu } from "./SelectorMenu"
import { Timer } from "./Timer"
import { Character, Coords } from "../../types"
import { A } from "@solidjs/router"
import { GameOver } from "./GameOver"
import { supabase } from "../.."

const clickIsWithinRange = (clickPercent: Coords, percent1: Coords, percent2: Coords) =>
    clickPercent[0] > percent1[0]
    && clickPercent[1] > percent1[1]
    && clickPercent[0] < percent2[0]
    && clickPercent[1] < percent2[1]

const randomIndicies = (range: number, length: number) => {

    const indicies: number[] = []

    for (let i = 0; i < length; i++) {
        do {
            indicies[i] = Math.floor(Math.random() * range)
        } while (
            indicies.some((num, j) => // returns true if there's a repeat index
                i !== j
                    ? num === indicies[i]
                    : false))
    }

    return indicies
}

const fetchCharacter = async (id: number) =>
    (await supabase.from('character_coords')
        .select()
        .eq('id', id))
        .data![0] as unknown as { 
                name: string, 
                x1: number, 
                y1: number, 
                x2: number, 
                y2: number
            }

const fetchCharacters = async () => {
    const indicies = randomIndicies(66, 3)
    const characters = await Promise.all(indicies.map(index => fetchCharacter(index + 1)))
    return characters.map<Character>(({ 
        name,
        x1,
        y1,
        x2,
        y2
    }) => ({
        name,
        percent1: [x1, y1],
        percent2: [x2, y2]
    }))
}

export const Game = () => {

    const [getCoordsPx, setCoordsPx] = createSignal<Coords>([-200, -200])

    const [getCoordsPercent, setCoordsPercent] = createSignal<Coords>([0, 0])

    const [getCharacters, {mutate: setCharacters}] = createResource(fetchCharacters)

    const [getSeconds, setSeconds] = createSignal(0)

    const [getIsCorrect, setIsCorrect] = createSignal<boolean | null>(null)

    createEffect(() => {
        if (getCoordsPx()[0] !== -200) setIsCorrect(null)
    })

    const intervalID = setInterval(() => {
        setSeconds(prev => prev + 1)
    }, 1000)

    const checkIsCorrect = (name: string) => {

        const characterIndex = getCharacters()!
            .findIndex(character => character.name === name)

        const isCorrect = setIsCorrect(
            clickIsWithinRange(
                getCoordsPercent(),
                getCharacters()![characterIndex].percent1,
                getCharacters()![characterIndex].percent2))

        if (isCorrect) {

            const length = setCharacters((characters) => [
                ...characters!.slice(0, characterIndex),
                ...characters!.slice(characterIndex + 1)
            ]).length

            if (length === 0) clearInterval(intervalID)

        } else {

            setSeconds(prev => prev + 10)
        }

        setCoordsPx([-200, -200])
    }

    return (
        <>
            <Show 
                when={!getCharacters.loading} 
                fallback={<div class="text-center">loading...</div>}>
                <Show when={getCharacters()?.length === 0}>
                    <GameOver seconds={getSeconds()} />
                </Show>
                <div class="flex flex-col items-center">
                    <A
                        class="button"
                        href="/">
                        Back to Home
                    </A>
                    <Timer getSeconds={getSeconds} />
                    <CharacterDisplay getCharacters={getCharacters} />
                    <PictureContainer
                        setCoordsPx={setCoordsPx}
                        setCoordsPercent={setCoordsPercent}>
                        <FloatingIcon
                            getCoordsPx={getCoordsPx}
                            getIsCorrect={getIsCorrect} />
                        <SelectorCircle getCoordsPx={getCoordsPx} />
                        <SelectorMenu
                            getCharactors={getCharacters}
                            getCoordsPx={getCoordsPx}
                            setCoordsPx={setCoordsPx}
                            checkIsCorrect={checkIsCorrect} />
                    </PictureContainer>
                </div>
            </Show>
        </>
    )
}
