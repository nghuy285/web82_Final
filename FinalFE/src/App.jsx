import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList/MovieList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="menu">
      <div className="bar">
        <img src="./menu.svg" alt="" />
        <h2>MOVIE UI</h2>
        <img src="./search.svg" alt="" />
      </div>
      <p className='popular'>Most Popular Movies</p>
      <MovieList></MovieList>
    </div>
    
    </>
  )
}

export default App
