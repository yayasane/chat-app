import { Route, Switch } from 'react-router-dom'
import './App.css'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/chats" component={ChatPage} />
      </Switch>
    </div>
  )
}

export default App
