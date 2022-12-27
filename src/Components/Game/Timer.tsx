import { Accessor } from "solid-js"

export const Timer = ({
    getSeconds
}: {
    getSeconds: Accessor<number>
}) => {

    return (
        <div class="text-xl text-center whitespace-nowrap 
        bg-gray-300 px-3 py-1 my-4 border-2 border-gray-600 
        rounded-lg shadow">
            {Math.floor(getSeconds() / 60)} : {(getSeconds() % 60 + '').padStart(2, '0')}
        </div>
    )
}
