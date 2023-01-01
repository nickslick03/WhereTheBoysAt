import { Route, Routes } from "@solidjs/router"
import { Game } from "./Game/Game"
import { Home } from "./Home"
import { Scores } from "./Scores"

export const App = () => {
  
  return (
    <>
      <h1 class="text-4xl font-bold pt-8 pb-16 text-center">
        Where the Boys At?
      </h1>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/game" component={Game} />
        <Route path="/scores" component={Scores} />
      </Routes>
    </>
  )
}
