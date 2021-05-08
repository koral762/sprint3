const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { BookAdd } from './apps/book/pages/BookAdd.jsx'
import { BookDetails } from './apps/book/pages/BookDetails.jsx'
import { EmailDetails } from './apps/Mail/cmps/EmailDetails.jsx'
import { BookApp } from './apps/book/BookApp.jsx'
import { NoteApp } from './apps/note/NoteApp.jsx'
import { Mail } from './pages/mail.jsx'
import { Home } from './pages/home.jsx'
import { Header } from './pages/header.jsx'

// Simple React Component
export function App() {
    return (<Router>

            <header>
                <Header />
            </header>
            <main>
                <Switch>
                    <Route component={EmailDetails} path="/mail/:mailId" />
                    <Route component={BookDetails} path='/book/read/:bookId' />
                    <Route component={BookAdd} path='/book/add-book' />
                    {/* <Route component={NoteApp} path="/Apps/note" /> */}
                    <Route component={Mail} path="/mail" />
                    <Route component={BookApp} path='/book' />
                    <Route component={NoteApp} path="/NoteApp" />
                    <Route component={Home} path="/" />
                    
                </Switch>
            </main>
            <footer>
                coffeerights &copy;
            </footer>
      
    </Router>
    )
}



