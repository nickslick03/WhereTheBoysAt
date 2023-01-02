import { Accessor } from "solid-js"

export const formatSeconds = (seconds: number) => 
    `${Math.floor(seconds / 60)} : ${(seconds % 60 + '').padStart(2, '0')}`

export const Timer = ({
    getSeconds
}: {
    getSeconds: Accessor<number>
}) => {

    return (
        <div class="text-xl text-center whitespace-nowrap 
        bg-gray-300 px-3 py-1 mt-10 mb-8 border-2 border-gray-600 
        rounded-lg shadow">
            {formatSeconds(getSeconds())}
        </div>
    )
}
