import { Route, Routes } from "@solidjs/router"
import { Game } from "./Game/Game"
import { Home } from "./Home"

export const App = () => {
  
  return (
    <>
      <h1 class="text-4xl font-bold mt-8 mb-16 text-center">
        Where the Boys At?
      </h1>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/game" component={Game} />
      </Routes>
    </>
  )
}
