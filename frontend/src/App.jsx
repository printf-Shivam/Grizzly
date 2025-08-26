import './App.css'
import HeroSection from './components/herosection/HeroSection'
import Navigation from './components/navigation/Navigation'
import { BrowserRouter as Router } from 'react-router-dom'


export default function App() {
  return (
        <Router>
      <Navigation/>
      <HeroSection/>
    </Router>

  )
}