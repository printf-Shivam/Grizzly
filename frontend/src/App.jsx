import './App.css'
import HeroSection from './components/herosection/HeroSection'
import Navigation from './components/navigation/Navigation'
import { BrowserRouter as Router } from 'react-router-dom'
import NewArrivals from './components/sections/NewArrivals'
import Footer from './components/footer/Footer'
import content from "./data/content.json"
import Category from './components/sections/categories/Category'

export default function App() {
  return (
        <>
      <HeroSection/>
      <NewArrivals />
      {content?.pages?.shop?.sections && content?.pages?.shop?.sections?.map((item, index) => <Category key={item?.title+index} {...item} />)}
      <Footer content={content?.footer}/>
    </>

  )
}