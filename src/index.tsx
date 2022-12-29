import { Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import './assets/index.css'
import { App } from './Components/App'

render(
    () => (
    <Router>
        <App />
    </Router>
    ),
    document.getElementById('root') as HTMLElement)
