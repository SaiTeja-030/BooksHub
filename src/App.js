import {Route} from 'react-router-dom'

import LoginForm from './components/Login'
import Home from './components/Home'
import BookShelves from './components/BookShelves'
import './App.css'

const App = () => (
  <>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/bookshelves" component={BookShelves} />
  </>
)

export default App
