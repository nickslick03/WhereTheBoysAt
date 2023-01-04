import { Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import { App } from './Components/App'

import './assets/index.css'

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://qjplzhpnqoewvnblthed.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcGx6aHBucW9ld3ZuYmx0aGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3NjIyNzEsImV4cCI6MTk4ODMzODI3MX0.nTJp0ND0hYx1apPqgPa8MJHxfCE58HNKS1tRL56Itjc')

render(
    () => (
        <Router>
            <App />
        </Router>),
    document.getElementById('root')!)
