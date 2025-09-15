import './App.css'
import HeroSection from './components/herosection/HeroSection'
import NewArrivals from './components/sections/NewArrivals'
import Category from './components/sections/categories/Category'
import content from "./data/content.json"
import Footer from './components/footer/Footer'
import { useEffect } from 'react'
import { fetchCategories } from './api/fetchCategories'
import { useDispatch } from 'react-redux'
import {loadCategories} from './store/features/category'
import { setLoading } from './store/features/common'

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setLoading(true));

    fetchCategories().then(res=>{
      dispatch(loadCategories(res));
    })
    .catch(err=>{
      console.log(err);
    })

    .finally(()=>{
      dispatch(setLoading(false))
    })
  }, [dispatch])
  return (
    <>
      <HeroSection/>
      <NewArrivals />
      {content?.pages?.shop?.sections && content?.pages?.shop?.sections?.map((item, index) => <Category key={item?.title+index} {...item} />)}
      <Footer content={content?.footer}/>
       </>
      
  )
}

export default App
